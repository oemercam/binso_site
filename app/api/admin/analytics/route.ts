import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const searchParams = request.nextUrl.searchParams
    const period = Number.parseInt(searchParams.get("period") || "7")

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - period)

    // Get page views
    const { data: pageViews, error: pvError } = await supabase
      .from("page_views")
      .select("*")
      .gte("created_at", startDate.toISOString())

    // Get contact forms (from contact_submissions table)
    const { data: contactForms, error: cfError } = await supabase
      .from("contact_submissions")
      .select("*")
      .gte("created_at", startDate.toISOString())

    // Calculate stats
    const totalVisitors = new Set(pageViews?.map((pv) => pv.session_id)).size || 0
    const totalPageViews = pageViews?.length || 0
    const totalContactForms = contactForms?.length || 0
    const conversionRate = totalVisitors > 0 ? (totalContactForms / totalVisitors) * 100 : 0

    // Daily visitors
    const dailyVisitors = getDailyStats(pageViews || [], period)

    // Top pages
    const topPages = getTopPages(pageViews || [])

    // Device stats
    const deviceStats = getDeviceStats(pageViews || [])

    // Browser stats
    const browserStats = getBrowserStats(pageViews || [])

    // Mock changes (would calculate from previous period in production)
    const stats = {
      totalVisitors,
      pageViews: totalPageViews,
      contactForms: totalContactForms,
      conversionRate,
      visitorsChange: 12.5,
      pageViewsChange: 8.3,
      formsChange: 25.0,
      dailyVisitors,
      topPages,
      deviceStats,
      browserStats,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return NextResponse.json({
      totalVisitors: 0,
      pageViews: 0,
      contactForms: 0,
      conversionRate: 0,
      visitorsChange: 0,
      pageViewsChange: 0,
      formsChange: 0,
      dailyVisitors: [],
      topPages: [],
      deviceStats: [],
      browserStats: [],
    })
  }
}

function getDailyStats(pageViews: any[], days: number) {
  const dailyMap = new Map()

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]
    dailyMap.set(dateStr, { date: dateStr, count: 0 })
  }

  pageViews.forEach((pv) => {
    const dateStr = pv.created_at.split("T")[0]
    if (dailyMap.has(dateStr)) {
      dailyMap.get(dateStr).count++
    }
  })

  return Array.from(dailyMap.values()).reverse()
}

function getTopPages(pageViews: any[]) {
  const pageMap = new Map()

  pageViews.forEach((pv) => {
    const url = pv.page_url || "/"
    if (!pageMap.has(url)) {
      pageMap.set(url, { url, views: 0, visitors: new Set() })
    }
    pageMap.get(url).views++
    pageMap.get(url).visitors.add(pv.session_id)
  })

  return Array.from(pageMap.values())
    .map((page) => ({
      url: page.url,
      views: page.views,
      visitors: page.visitors.size,
      avgTime: "2:34", // Mock average time
    }))
    .sort((a, b) => b.views - a.views)
}

function getDeviceStats(pageViews: any[]) {
  const deviceMap = new Map()

  pageViews.forEach((pv) => {
    const device = pv.device_type || "Desktop"
    deviceMap.set(device, (deviceMap.get(device) || 0) + 1)
  })

  return Array.from(deviceMap.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
}

function getBrowserStats(pageViews: any[]) {
  const browserMap = new Map()

  pageViews.forEach((pv) => {
    const browser = pv.browser || "Chrome"
    browserMap.set(browser, (browserMap.get(browser) || 0) + 1)
  })

  return Array.from(browserMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

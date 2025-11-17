import dynamic from "next/dynamic"

const TeamMemberForm = dynamic(
  () => import("@/components/admin/team-member-form").then((mod) => ({ default: mod.TeamMemberForm })),
  {
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    ),
  }
)

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Neues Team-Mitglied</h1>
      <TeamMemberForm />
    </div>
  )
}

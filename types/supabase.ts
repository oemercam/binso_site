export type Database = {
  public: {
    Tables: {
      portfolio_projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          long_description: string | null
          category: string
          image_url: string
          technologies: string[]
          features: string[]
          results: string[]
          client_name: string | null
          project_url: string | null
          github_url: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["portfolio_projects"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["portfolio_projects"]["Insert"]>
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          icon: string
          features: string[]
          price_from: number | null
          is_published: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["services"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          image_url: string | null
          email: string | null
          linkedin_url: string | null
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["team_members"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["team_members"]["Insert"]>
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          company: string | null
          content: string
          rating: number
          image_url: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["testimonials"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string
          order_index: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["faqs"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["faqs"]["Insert"]>
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["contact_submissions"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["contact_submissions"]["Insert"]>
      }
    }
  }
}

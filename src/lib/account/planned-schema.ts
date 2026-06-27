/**
 * Planned Supabase tables for account settings (not migrated yet).
 *
 * user_notification_preferences
 *   user_id uuid PK → auth.users
 *   push_enabled boolean
 *   email_enabled boolean
 *   bill_created boolean
 *   payment_received boolean
 *   split_confirmed boolean
 *   household_invite boolean
 *   marketing boolean
 *   updated_at timestamptz
 *
 * user_privacy_preferences
 *   user_id uuid PK → auth.users
 *   show_ai_details boolean
 *   updated_at timestamptz
 *
 * user_sessions (optional if not using Supabase Auth session APIs directly)
 *   id uuid PK
 *   user_id uuid → auth.users
 *   device_label text
 *   platform text
 *   last_active_at timestamptz
 *   revoked_at timestamptz
 *
 * data_export_requests
 *   id uuid PK
 *   user_id uuid → auth.users
 *   status text
 *   download_url text
 *   expires_at timestamptz
 *   created_at timestamptz
 *
 * account_deletion_requests
 *   id uuid PK
 *   user_id uuid → auth.users
 *   scheduled_for timestamptz
 *   cancelled_at timestamptz
 *   created_at timestamptz
 */

export {};

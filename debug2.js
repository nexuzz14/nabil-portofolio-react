const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  "https://jjlsygkrjfmtvvuqrdqx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbHN5Z2tyamZtdHZ2dXFyZHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNzc0NDAsImV4cCI6MjA5NjY1MzQ0MH0.V4L2pHoYZ8wCzXbgwVaiiFAIawiJh7fcuuaODsAAAtE"
);
async function run() {
  const { data, error } = await supabase.from('education').select('*');
  console.log("Error:", error);
  console.log("Data:", JSON.stringify(data, null, 2));
}
run();

const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
  if (line.includes('=')) {
    const [key, ...val] = line.split('=');
    process.env[key.trim()] = val.join('=').trim();
  }
});
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const { data } = await supabase.from('education').select('*');
  console.log("EDUCATION:", data);
}
run();

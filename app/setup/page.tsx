import { SetupUser } from "@/actions/billing/setupUser";
import { waitFor } from "@/lib/helper/waitFor";

async function SetupPage() {
  
  return await SetupUser()
}

export default SetupPage;

import { waitFor } from "@/lib/helper/waitFor"
import { Environment, ExecutionEnvironment } from "@/types/executor"
import puppeteer from "puppeteer"
import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowser"

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
   try {
    const websiteURL = environment.getInput("Website URL")

    const browser = await puppeteer.launch({
        headless: false 
    })
    environment.setBrowser(browser)
    const page = await browser.newPage()
    await page.goto(websiteURL)
    environment.setPage(page)
    return true
   } catch (error) {
    console.error(error)
    return false
   }
}


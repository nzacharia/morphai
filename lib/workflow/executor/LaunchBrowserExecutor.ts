
import { waitFor } from "@/lib/helper/waitFor"
import { Environment, ExecutionEnvironment } from "@/types/executor"
import puppeteer from "puppeteer"
import { LaunchBrowserTask } from "@/lib/workflow/task/LaunchBrowser"

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
   try {
    const websiteURL = environment.getInput("Website URL")

    const browser = await puppeteer.launch({
        headless: true 
    })
    environment.log.info("Browser started successfully")
    environment.setBrowser(browser)
    const page = await browser.newPage()
    await page.goto(websiteURL)
    environment.setPage(page)
    environment.log.info(`Navigated to ${websiteURL} successfully`)
    
    return true
   } catch (error: any) {
    environment.log.error(error.message)
    return false
   }
}



import { ExecutionEnvironment } from "@/types/executor"
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement"
import * as cheerio from "cheerio"
export async function ExtractTextFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>): Promise<boolean> {
    try {
        const selector = environment.getInput("Selector")
        if(!selector) return false
        const html = environment.getInput("Html")
        if(!html) return false
        const $ = cheerio.load(html)
        const element = $(selector)

        if(!element) {
            console.error("No element found") 
            return false
        }
        const extractedText = $.text(element)
        if(!extractedText) {
            console.error("No text found") 
            return false
        }
        environment.setOutput("Extracted text", extractedText)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


import { ExecutionEnvironment } from "@/types/executor"
import { ClickElementTask } from "../task/ClickElement"
import { ScrollToElementTask } from "../task/ScrollToElement"

export async function ScrollToElementExecutor(environment: ExecutionEnvironment<typeof ScrollToElementTask>): Promise<boolean> {
    try {
           const selector = environment.getInput("Selector")
           if (!selector) {
            environment.log.error("input->selector is required")
            return false
           }
           await environment.getPage()!.evaluate((selector:string)=>{
            const element = document.querySelector(selector)
            if (!element) {
                environment.log.error(`element with selector ${selector} not found`)
                return false
            }
            const top = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({top:top})
           },selector)
        return true
    } catch (error: any) {
        environment.log.error(error.message)    
        return false
    }
}


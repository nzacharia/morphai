
import { ExecutionEnvironment } from "@/types/executor"
import { ClickElementTask } from "../task/ClickElement"
import { DeliverViaWebhookTask } from "../task/DeliverViaWebhook"

export async function DeliverViaWebhookExecutor(environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>): Promise<boolean> {
    try {
           const targetUrl = environment.getInput("Target URL")
           if (!targetUrl) {
            environment.log.error("input->targetUrl is required")
            return false
           }
           const body = environment.getInput("Body")
           if (!body) {
            environment.log.error("input->body is required")
            return false
           }
           const response = await fetch(targetUrl,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
           })
           const status = response.status
           if (status!==200 ) {
            environment.log.error(`Webhook delivery failed with status ${status}`)
            return false
           }

           const responseBody = await response.json()
           environment.log.info(`Webhook delivery successful with response: ${JSON.stringify(responseBody)}`)
        return true
    } catch (error: any) {
        environment.log.error(error.message)    
        return false
    }
}


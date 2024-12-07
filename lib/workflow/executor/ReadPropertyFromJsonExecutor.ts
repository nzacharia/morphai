
import { ExecutionEnvironment } from "@/types/executor"
import { ClickElementTask } from "../task/ClickElement"
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson"

export async function ReadPropertyFromJsonExecutor(environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>): Promise<boolean> {
    try {
           const jsonData = environment.getInput("JSON")
           if (!jsonData) {
            environment.log.error("input->json is required")
            return false
           }
           const propertyName = environment.getInput("Property name")
           if (!propertyName) {
            environment.log.error("input->property name is required")
            return false
           }
           const result = JSON.parse(jsonData)
           const propertyValue = result[propertyName]
           if (!propertyValue) {
            environment.log.error(`property ${propertyName} not found in JSON`)
            return false
           }
           environment.setOutput("Property value", propertyValue)
        return true
    } catch (error: any) {
        environment.log.error(error.message)    
        return false
    }
}


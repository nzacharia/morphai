import { ExecutionEnvironment } from "@/types/executor"
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor"
import { PageToHtmlExecutor } from "./PageToHtmlExecutor"
import { TaskType } from "@/types/task"
import { WorkflowTask } from "@/types/workflow"
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor"
import { FillInputExecutor } from "./FillInputExecutor"
import { ClickElementExecutor } from "./ClickElementExecutor"
import { WaitForElementExecutor } from "./WaitForElementExecutor"
import { DeliverViaWebhookExecutor } from "./DeliverViaWebhookExecutor"
import { ExtractDataWithAiExecutor } from "./ExtractDataWithAiExecutor"
import { ReadPropertyFromJsonExecutor } from "./ReadPropertyFromJsonExecutor"
type ExecutorFn<T extends WorkflowTask> = (environment: ExecutionEnvironment<T>) => Promise<boolean>

type RegistryType = {
    [key in TaskType]: ExecutorFn<WorkflowTask & {type: key}>;
}
export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
    FILL_INPUT: FillInputExecutor,
    CLICK_ELEMENT: ClickElementExecutor,    
    WAIT_FOR_ELEMENT: WaitForElementExecutor,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
    EXTRACT_DATA_WITH_AI: ExtractDataWithAiExecutor,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor
}



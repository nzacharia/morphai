import { ExecutionEnvironment } from "@/types/executor"
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor"
import { PageToHtmlExecutor } from "./PageToHtmlExecutor"
import { TaskType } from "@/types/task"
import { WorkflowTask } from "@/types/workflow"
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor"
import { FillInputExecutor } from "./FillInputExecutor"

type ExecutorFn<T extends WorkflowTask> = (environment: ExecutionEnvironment<T>) => Promise<boolean>

type RegistryType = {
    [key in TaskType]: ExecutorFn<WorkflowTask & {type: key}>;
}
export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
    FILL_INPUT: FillInputExecutor,
}



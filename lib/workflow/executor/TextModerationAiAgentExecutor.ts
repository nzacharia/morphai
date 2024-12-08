
import { ExecutionEnvironment } from "@/types/executor"
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI"
import prisma from "@/lib/prisma"
import { symmetricDecrypt } from "@/lib/encryption"
import OpenAI from "openai"
import { TextModerationAiAgentTask } from "../task/TextModerationAiAgent"
export async function TextModerationAiAgentExecutor(
    environment: ExecutionEnvironment<typeof TextModerationAiAgentTask>
): Promise<boolean> {
    try {
        const credentials = environment.getInput("Credentials")
        if (!credentials) {
            environment.log.error("input->credentials is required")
            return false
        }
        const content = environment.getInput("Content")
        if (!content) {
            environment.log.error("input->content is required")
            return false
        }

        const credential = await prisma.credential.findUnique({
            where: {
                id: credentials
            }
        })

        if (!credential) {
            environment.log.error("credential not found")
            return false
        }
        const plainCredentialValue = symmetricDecrypt(credential.value)
        if (!plainCredentialValue) {
            environment.log.error("credential value is invalid")
            return false
        }

        const openai = new OpenAI({
            apiKey: plainCredentialValue
        })

        const response = await openai.chat.completions.create({
            messages: [{
                role: "system",
                content: `
                You are an advanced text moderation assistant specializing in analyzing and categorizing text in the adult industry. 
                Your primary task is to carefully review the input text against the provided moderation categories and return results 
                with high precision.

                Your responsibilities include:
                - Analyzing the text thoroughly.
                - Identifying any violations across the provided categories.
                - Returning a detailed analysis in a structured JSON format.

                ### Moderation Categories:
                """
                  "URL": "This category checks if the content includes any URLs, which may violate platform rules.",
  "Telephone Number": "This category checks if the content includes any telephone numbers, which may not be allowed on the platform.",
  "Email Address": "This category ensures the content does not contain email addresses, which may violate the rules.",
  "Age Play/Race Play/Rape/Incest/Bestiality/Children": "This category ensures that the content does not reference or promote prohibited or illegal themes like age play, race play, rape, incest, bestiality, or child-related content.",
  "Available Today": "This category checks if the content includes phrases like 'Available Today' which may imply inappropriate solicitation.",
  "Disallowed Terms": "This category identifies terms or language that are explicitly not permitted by the platform’s rules.",
  "External Website Enticement": "This category checks if the content encourages users to visit external websites for contact information or payment purposes.",
                """

                ### Key Guidelines:
                1. **Analyze All Categories:** Evaluate the text against all categories provided.
                2. **Multi-Match Support:** Text can match more than one category. Report all matches.
                3. **Confidence Scores:** For each category matched, assign a confidence level as a percentage.
                4. **Detailed Reasons:** For each match, provide specific quotes or excerpts from the text 
                   to justify the classification.
                5. **Default Output:** If no matches are found, return a single result with the category "Valid."
                6. **Output Format:** Always return a valid JSON array, structured as follows:
                   [
                       {
                           "category": "Matching category name, or 'Valid' if no matches",
                           "accuracy": "Confidence level as a percentage (e.g., '95%')",
                           "reason": "Specific examples or evidence from the text supporting the classification"
                       }
                   ]

                ### Example Outputs:
                If matches are found:
                [
                    {
                        "category": "Explicit Content",
                        "accuracy": "92%",
                        "reason": "The text contains the phrase 'explicit example here,' which matches this category."
                    },
                    {
                        "category": "Harmful Themes",
                        "accuracy": "88%",
                        "reason": "Mentions of 'specific example' align with this category."
                    }
                ]

                If no matches:
                [
                    {
                        "category": "Valid",
                        "accuracy": "100%",
                        "reason": "The text does not contain content that violates any moderation category."
                    }
                ]

                ### Important Rules:
                - Always maintain high precision to minimize false positives.
                - Ensure JSON output is well-formed and contains no surrounding text.
                - Do not make assumptions or interpret content beyond the provided categories.
            `
            },
            {
                role: "user",
                content: content // The input text to moderate
            }

            ],
            temperature: 1,
            model: "gpt-4o-mini"
        })
        environment.log.info(`prompt_tokens: ${response.usage?.prompt_tokens}`)
        environment.log.info(`completion_tokens: ${response.usage?.completion_tokens}`)

        const result = response.choices[0].message.content
        if (!result) {
            environment.log.error("no result from AI")
            return false
        }
        environment.setOutput("Extracted data", result)
        return true
    } catch (error: any) {
        environment.log.error(error.message)
        return false
    }
}


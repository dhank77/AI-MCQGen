from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain
from langchain_google_genai import ChatGoogleGenerativeAI
from django.conf import settings
import environ
env = environ.Env()
environ.Env.read_env('.env')

def generate(kategori, jumlah, kesulitan, level) :
    gemini = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=env("GOOGLE_GEMINI"), temperature=0.1)


    TEMPLATE="""
    You are an expert MCQ maker, You are a very reliable teacher in all fields who is assigned to create questions and answers using multiple choice questions.
    Create multiple choice questions with {subject} theme and intended for {level} students with {tone} level.
    make sure that the questions are not repeated and make sure all the questions are in text form
    Ensure to make {number} MCQs
    Make sure to format your response like  RESPONSE_JSON below  and use it as a guide and don't use any other words like kuis / quiz : RESPONSE_JSON, just start  and end with curly braces like format below and use double quotes not single. \
    {response_json}
    """

    quiz_prompt = PromptTemplate(
        input_variables=["text", "number", "subject", "tone", "level"],
        template=TEMPLATE,
    )

    quiz_chain = LLMChain(llm=gemini, prompt=quiz_prompt, output_key="quiz", verbose=True)

    TEMPLATE2="""
    You are an grammar expert and language writer. Given Multiple Choice Quizzes for {level} students.
    You need to evaluate the complexity of the questions and provide a complete analysis of the quiz. Only use a maximum of 50 words for complexity analysis. 
    if the quiz does not match the student's cognitive and analytical abilities,
    update quiz questions that need to be changed and change the tone abilities
    Quiz_MCQ:
    {quiz}

    Check from the expert language writer from the quiz above:
    """

    quiz_eval = PromptTemplate(
        input_variables=["quiz","level"],
        template=TEMPLATE2
    )

    review_chain=LLMChain(llm=gemini, prompt=quiz_eval, output_key="eval", verbose=True)

    TEMPLATE3="""
    translate the entire following text into Indonesian, if using money format or currency, change it to rupiah with the exchange rate of 1 dollar being 15 thousand rupiah.
    
    {quiz}
    """

    trans_eval = PromptTemplate(
        input_variables=["quiz","eval"],
        template=TEMPLATE3
    )

    trans_chain=LLMChain(llm=gemini, prompt=trans_eval, output_key="trans", verbose=True)

    generate_eval=SequentialChain(
        chains=[quiz_chain, review_chain, trans_chain],
        input_variables=["text", "number", "subject", "tone", "response_json", "level"],
        output_variables=["quiz", "eval", "trans"],
        verbose=True
    )

    res_json = {
        "1": {
            "mcq": "multiple choice question",
            "options": {
                "a": "choice here",
                "b": "choice here",
                "c": "choice here",
                "d": "choice here",
            },
            "correct": "correct answer",
        },
        "2": {
            "mcq": "multiple choice question",
            "options": {
                "a": "choice here",
                "b": "choice here",
                "c": "choice here",
                "d": "choice here",
            },
            "correct": "correct answer",
        },
        "3": {
            "mcq": "multiple choice question",
            "options": {
                "a": "choice here",
                "b": "choice here",
                "c": "choice here",
                "d": "choice here",
            },
            "correct": "correct answer",
        },
    }
    
    response = generate_eval({
        "text": "Soal Pilihan Ganda",
        "number": jumlah,
        "subject": kategori,
        "tone": kesulitan,
        "response_json": res_json,
        "level": level
    })

    return response
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain
from langchain_community.chat_models import ChatOllama
from django.conf import settings

def generate(kategori, jumlah, kesulitan, level) :
    pass
    llama=ChatOllama(model='llama3')

    TEMPLATE="""
    Text={text}
    You are a very reliable teacher in all fields who is assigned to create questions and answers using multiple choice questions.
    Create multiple choice questions with {subject} theme and intended for {level} students with {tone} level.
    make sure that the questions are not repeated and make sure all the questions are in text form
    make sure to make questions is {number}
    """

    quiz_prompt = PromptTemplate(
        input_variables=["text", "number", "subject", "tone", "response_json", "level"],
        template=TEMPLATE,
    )

    quiz_chain = LLMChain(llm=llama, prompt=quiz_prompt, output_key="quiz", verbose=True)

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

    review_chain=LLMChain(llm=llama, prompt=quiz_eval, output_key="eval", verbose=True)

    TEMPLATE3="""
    translate the entire following text into Indonesian, if using money format or currency, change it to rupiah with the exchange rate of 1 dollar being 15 thousand rupiah.
    Make sure the response format is like RESPONSE_JSON below and use that as a guide

    quiz : {quiz}

    eval : {eval}

    ### RESPONSE_JSON
    {response_json}
    """

    trans_eval = PromptTemplate(
        input_variables=["quiz","eval"],
        template=TEMPLATE3
    )

    trans_chain=LLMChain(llm=llama, prompt=trans_eval, output_key="trans", verbose=True)

    generate_eval=SequentialChain(
        chains=[quiz_chain, review_chain, trans_chain],
        input_variables=["text", "number", "subject", "tone", "response_json", "level"],
        output_variables=["quiz", "eval", "trans"],
        verbose=True
    )

    res_json = str(settings.BASE_DIR) + '/' + 'templates/Response.json'
    response = generate_eval({
        "text": "Soal Pilihan Ganda",
        "number": jumlah,
        "subject": kategori,
        "tone": kesulitan,
        "response_json": res_json,
        "level": level
    })

    return response
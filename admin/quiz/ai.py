from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain
from langchain_community.chat_models import ChatOllama
from django.conf import settings

def generate(kategori, jumlah, kesulitan, level) :
    pass
    llama=ChatOllama(model='phi3')

    TEMPLATE="""
    Text={text}
    Kamu adalah seorang guru yang sangat handal dalam segala bidang yang ditugaskan untuk membuat soal dan jawaban dengan tipe soal pilihan ganda menggunakan bahasa indonesia.
    buat soal pilihan ganda yang jumlah soalnya {number} dengan tema {subject} dan diperuntukkan bagi siswa {level} dengan tingkat kesulitan {tone} .
    pastikan bahwa soalnya tidak berulang dan pastikan semua soalnya dalam bentuk teks
    pastikan format respon nya seperti RESPONSE_JSON dibawah dan gunakan itu sebagai petunjuk 
    pastikan untuk membuat soal {number}
    ### RESPONSE_JSON
    {response_json}
    """

    quiz_prompt = PromptTemplate(
        input_variables=["text", "number", "subject", "tone", "response_json", "level"],
        template=TEMPLATE,
    )

    quiz_chain = LLMChain(llm=llama, prompt=quiz_prompt, output_key="quiz", verbose=True)

    TEMPLATE2="""
    Kamu adalah seorang ahli tata bahasa indonesia dan penulis bahasa indonesia. Diberikan Kuis Pilihan Ganda untuk siswa {level}.
    Anda perlu mengevaluasi kompleksitas pertanyaan dan memberikan analisis kuis secara lengkap. Hanya gunakan maksimal 50 kata untuk analisis kompleksitas. 
    jika kuis tidak sesuai dengan kemampuan kognitif dan analitis siswa,
    perbarui soal kuis yang perlu diubah dan ubah nadanya agar sesuai dengan kemampuan siswa
    Kuis_MCQ:
    {quiz}

    Periksa dari Penulis ahli Bahasa Indoesia dari kuis di atas:
    """

    quiz_eval = PromptTemplate(
        input_variables=["quiz","level"],
        template=TEMPLATE2
    )

    review_chain=LLMChain(llm=llama, prompt=quiz_eval, output_key="eval", verbose=True)

    generate_eval=SequentialChain(
        chains=[quiz_chain, review_chain],
        input_variables=["text", "number", "subject", "tone", "response_json", "level"],
        output_variables=["quiz", "eval"],
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

    for res in response.astream() :
        print(res['quiz'])
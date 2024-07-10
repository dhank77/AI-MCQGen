from inertia import render
import json
from .validation import QuizValidation
from .ai import generate

def index(request) :
    if(request.method == 'POST') :
        data = json.loads(request.body)
        form = QuizValidation(data=data)

        if form.is_valid() :
            res = generate(kategori=data['kategori'], jumlah=data['jumlah'], kesulitan=data['kesulitan'], level=data['level'])
            return render(request, 'admin/quiz/index', props={
                "data" : res['trans']
            })
        else :
            return render(request, 'admin/quiz/index', props={
                "errors" : form.errors
            })
    else :
        return render(request, 'admin/quiz/index')
const cautraloi = document.querySelectorAll('.cautraloi');
const submitBtn = document.getElementById('submit');
const sb = document.getElementById('submit2');
const quiz = document.getElementById('question');

let socaudung = 0;
let cauhoihientai = 0;
let diem = 0;

load_cauhoi();

function load_cauhoi() {
    remove_answer();
    
    fetch('http://localhost/tintuc/Api/question/read.php')
        .then(res => res.json())
        .then(data => {
            document.getElementById('tongsocauhoi').value = data.question.length;

            // console.log(data);
            const cauhoi = document.getElementById('title');

            const a_cautraloi = document.getElementById('a_cautraloi');
            const b_cautraloi = document.getElementById('b_cautraloi');
            const c_cautraloi = document.getElementById('c_cautraloi');
            const d_cautraloi = document.getElementById('d_cautraloi');
            // hien thi cautraloi và cauhoi
            const get_cauhoi = data.question[cauhoihientai];
            console.log(get_cauhoi);

            cauhoi.innerText = get_cauhoi.title;
            a_cautraloi.innerText = get_cauhoi.cau_a;
            b_cautraloi.innerText = get_cauhoi.cau_b;
            if (get_cauhoi.cau_c != null) {
                c_cautraloi.innerText = get_cauhoi.cau_c;
            } else {
                document.getElementById('cau_c').classList.add('hienthicautrloi');
            }
            if (get_cauhoi.cau_d != null) {
                d_cautraloi.innerText = get_cauhoi.cau_d;
            } else {
                document.getElementById('cau_d').classList.add('hienthicautraloi');
            }
            // c_cautraloi.innerText = get_cauhoi.cau_c;
            // d_cautraloi.innerText = get_cauhoi.cau_d;

            const dapan = document.getElementById('caudung').value = get_cauhoi.cau_dung;



        })
        .catch(error => console.log(error));

}
// chọn câu trả lời
function get_answer() {
    let answer = undefined;
    cautraloi.forEach((cautraloi) => {
        if (cautraloi.checked) {
            answer = cautraloi.id;
        }
    })
    return answer;
}
// bỏ câu trả lời
function remove_answer() {
    cautraloi.forEach((cautraloi) => {
        cautraloi.checked = false;
    })
}


// sự kiện click submit 
submitBtn.addEventListener("click", () => {
    const answer = get_answer();
    console.log(answer);
   

    if (answer) {
        if (answer === document.getElementById('caudung').value) {
            socaudung++;
            
            diem = diem + 1;
        }
    }
    cauhoihientai++;
    load_cauhoi();
    
    if (cauhoihientai < document.getElementById('tongsocauhoi').value) {
        load_cauhoi();
    } else {
        const tongsocauhoi = document.getElementById('tongsocauhoi').value;
        //tong ket bai
        quiz.innerHTML = `
        <h2>Bạn đã đúng  ${socaudung} câu hỏi.</h2>
        <p>Số điểm đạt được là : ${diem}</p>
        <button onclick="location.reload()">Làm lại bài</button>
        `
    }
})

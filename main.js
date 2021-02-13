const header = document.querySelector('.header');
const startBtn = document.querySelector('.header__btn');
const questionBox = document.querySelector('.question-box');
const question = questionBox.querySelector('.question');
const selectBar = document.querySelector('.select-bar');
const result = document.querySelector('.result');

const opts = selectBar.querySelectorAll('li');

const opt1 = selectBar.querySelector('.opt1');
const opt2 = selectBar.querySelector('.opt2');
const opt3 = selectBar.querySelector('.opt3');
const opt4 = selectBar.querySelector('.opt4');
const opt5 = selectBar.querySelector('.opt5');

let wTypeScore = 0, sTypeScore = 0, hTypeScore = 0, lTypeScore = 0;
let now = 0;

const audio = new Audio('onclick.mp3');

const questions = [{
},

{
  // Q1
  q: "초등교사의 가장 큰 매력은 무엇입니까?",
  a1: "아이들과 함께하는 시간이 많다.", //w l
  a2: "사회적으로 의미있는 일을 할 수 있다.", //w h
  a3: "직업이 안정적이다.", //s l
  a4: "다른 사람에게 무언가를 가르치는 일 자체가 좋다.", //w h
  a5: "다른 직업에 비해 인간 관계로 인한 스트레스가 적다." //s l
},

{
  // Q2
  q: "초등교사의 가장 큰 단점은 무엇입니까?",
  a1: "역시 아이들과 함께하는 시간이 많다.", //s h
  a2: "별 시덥지도 않은 일이 너무 많은데 안 하면 큰일난다.", //h l
  a3: "민원 스트레스", //s h
  a4: "다른 사람에게 무언가를 가르치는 일 자체가 싫다.", //s h
  a5: "다른 직업에 비해 인간 관계(학생, 학부모, 교직원)로 인한 스트레스가 많다." //s x
},

{
  // Q3
  q: "당신이 생각하는 가장 바람직한 교사상을 고르시오.",
  a1: "말을 쉽게 잘하는 교사", //o l
  a2: "감정기복이 별로 없는 원칙주의자", //o h
  a3: "아이들을 진심으로 대하는 교사", //w o
  a4: "끊임없이 배우려고 노력하는 교사", //o h
  a5: "융통성이 뛰어난 교사" //o l
},

{
  // Q4
  q: "온라인 수업에 대한 표현 중 가장 공감하는 말을 고르시오.",
  a1: "재밌다.", //o h
  a2: "편하다.", //s h
  a3: "확실히 등교 수업보다 못하다.", //w l
  a4: "어렵다.", //s l
  a5: "신기하다." //w l
},

{
  // Q5
  q: "다음 중 가장 끔찍한 악몽을 고르시오.",
  a1: "속보! 교육부 지침, 교사는 방학 중 출근 의무화", //o h
  a2: "축하합니다. 당신은 올해 교무부장으로 승진하셨습니다.", //w s
  a3: "나는 6학년 부장이다. 수학 여행 당일 날 잠에서 일어나 시계를 보니 오전 11시다. 부재중 통화 39건.",//s h
  a4: "학부모 공개 수업 중에 갑자기 아이 둘이 치고박고 싸운다. 다른 아이들도 덩달아 달려든다. 아무리 말려도 안 통한다. 교실은 이내 난장판이 되고 만다.",//s l
  a5: "축 교대 입학. 과거로 돌아간다."//s h
},

{
  // Q6
  q: "동료 교사 중에서 가장 마음에 드는 사람을 고르시오.",
  a1: "일처리를 시원시원하게 하는 사람",//w h
  a2: "유쾌하고 재미있는 사람",//w h
  a3: "참교사",//w l
  a4: "착한 사람",//w l
  a5: "잘생기고 예쁜 사람"//s h
},

{
  // Q7
  q: "다음 학생 중 가장 마음에 드는 학생을 고르시오.",
  a1: "내 말을 신처럼 받들어 모시는 우리반 학생",//w l
  a2: "수업 시간에 집중을 아주 잘하는 우리반 학생",//w l
  a3: "나를 잘 웃기는 우리반 학생",//w h
  a4: "예체능에 소질이 있는 학생",//w h
  a5: "다른 반 학생"//s l
},

{
  // Q8
  q: "다음 중 가장 고마운 학부모님을 고르시오.",
  a1: "학교 일에 적극적으로 참여해 주시는 우리반 학부모님", //w l
  a2: "통신문과 알림장을 잘 챙기시는 우리반 학부모님", //w l
  a3: "상담을 꺼리시는 우리반 학부모님", //s h
  a4: "상담을 좋아하시는 우리반 학부모님", //w l
  a5: "촌지를 주시려는 학부모님" //w l
},

{
  // Q9
  q: "다음은 당신이 내년에 근무하게 될 발령지 후보입니다. 가장 마음에 드는 곳을 고르시오.",
  a1: "행정 업무가 적은 대신 초과밀 학급(업무: 심장충격기 관리 / 학급 인원: 39명)", //w l
  a2: "나 빼고 모두 잘생기고 아름다운 학교(평균 원빈, 김태희)", //w h
  a3: "교무실은 평화롭지만 행정실이 무서운 학교(협조 반려율 연 평균 78%)", //w h
  a4: "학교가 커서 하루종일 혼자 지내는 쓸쓸한 학교(회식 장소: 줌 동학년 소회의실)", //s 
  a5: "작은 학교라서 사람들과 일 폭탄을 주고 받는 화목한 학교" //s l
},

{
  // Q10
  q: "오늘은 업무분장 희망서를 제출하는 날입니다. 아래 업무분장표를 보고 가장 마음에 드는 업무를 하나만 고르시오.",
  a1: "체육부장(읍면리 연합 운동회로 올해 교육청 예산 3,000만 원 확보)", //s h
  a2: "방송 업무(학교 공식 유튜브 채널 운영, 구독자 약 3백 만, 골드 버튼 수상)", //w h
  a3: "학교 방역(학군 내 인구 대비 발병률 25%), 자가진단 관리(해당 학군 내 휴대폰 보급률 8.3 %), 입구 발열 체크(수동)", //s l
  a4: "나이스, 출결(내년에 감사)", //s l
  a5: "사표" //s l
},
{

}
]

function startTest() {
  header.classList.add("display--hide");
  question.textContent = questions[1].q;
  opt1.textContent = questions[1].a1;
  opt2.textContent = questions[1].a2;
  opt3.textContent = questions[1].a3;
  opt4.textContent = questions[1].a4;
  opt5.textContent = questions[1].a5;
  question.classList.add("question--display");
  selectBar.classList.add("display--show");
  now += 1;
}

function nextQuestion() {
  audio.play();
  now += 1;
  question.textContent = questions[now].q;
  opt1.textContent = questions[now].a1;
  opt2.textContent = questions[now].a2;
  opt3.textContent = questions[now].a3;
  opt4.textContent = questions[now].a4;
  opt5.textContent = questions[now].a5;
  console.log(now);
  switch (now) {
    case 1:
      opt1.addEventListener('click', addWtypeScore);
      opt2.addEventListener('click', addWtypeScore);
      opt3.addEventListener('click', addStypeScore);
      opt4.addEventListener('click', addWtypeScore);
      opt5.addEventListener('click', addStypeScore);
      break;
    case 2:
      opt1.addEventListener('click', addStypeScore);
      opt2.addEventListener('click', addWtypeScore);
      opt3.addEventListener('click', addStypeScore);
      opt4.addEventListener('click', addStypeScore);
      opt5.addEventListener('click', addStypeScore);
      break;
    case 3:
      opt1.addEventListener('click', addWtypeScore);
      opt2.addEventListener('click', addWtypeScore);
      opt3.addEventListener('click', addWtypeScore);
      opt4.addEventListener('click', addWtypeScore);
      opt5.addEventListener('click', addWtypeScore);
      break;
    case 4:
      opt1.addEventListener('click', addWtypeScore);
      opt2.addEventListener('click', addStypeScore);
      opt3.addEventListener('click', addWtypeScore);
      opt4.addEventListener('click', addStypeScore);
      opt5.addEventListener('click', addWtypeScore);
      break;
    case 5:
      opt1.addEventListener('click', addWtypeScore);
      opt2.addEventListener('click', addStypeScore);
      opt3.addEventListener('click', addStypeScore);
      opt4.addEventListener('click', addStypeScore);
      opt5.addEventListener('click', addStypeScore);
      break;
    case 6:
      opt1.addEventListener('click', addWtypeScore);
      opt2.addEventListener('click', addWtypeScore);
      opt3.addEventListener('click', addWtypeScore);
      opt4.addEventListener('click', addWtypeScore);
      opt5.addEventListener('click', addStypeScore);
      break;
    case 7:
      opt1.addEventListener('click', addWtypeScore);
      opt2.addEventListener('click', addWtypeScore);
      opt3.addEventListener('click', addWtypeScore);
      opt4.addEventListener('click', addWtypeScore);
      opt5.addEventListener('click', addStypeScore);
      break;
    case 8:
      opt1.addEventListener('click', addWtypeScore);
      opt2.addEventListener('click', addWtypeScore);
      opt3.addEventListener('click', addStypeScore);
      opt4.addEventListener('click', addWtypeScore);
      opt5.addEventListener('click', addWtypeScore);
      break;
    case 9:
      opt1.addEventListener('click', addWtypeScore);
      opt2.addEventListener('click', addWtypeScore);
      opt3.addEventListener('click', addWtypeScore);
      opt4.addEventListener('click', addStypeScore);
      opt5.addEventListener('click', addWtypeScore);
      break;
    case 10:
      opt1.addEventListener('click', addStypeScore);
      opt2.addEventListener('click', addWtypeScore);
      opt3.addEventListener('click', addStypeScore);
      opt4.addEventListener('click', addStypeScore);
      opt5.addEventListener('click', addStypeScore);
      break;
    default:
      showResult();
  }

}

function showResult() {
  questionBox.classList.add("display--hide");
  selectBar.classList.add("display--hide");
  result.classList.add("display--show");
  if (wTypeScore > sTypeScore) {
    result.textContent = "당신에겐 전담보다 담임이 더 알맞습니다.";
  } else {
    result.textContent = "당신에겐 담임보다 전담이 더 알맞습니다.";
  }
}

function addWtypeScore() {
  wTypeScore++;
}

function addStypeScore() {
  sTypeScore++;
}

function handleClickOpts() {
  opts[0].addEventListener('click', nextQuestion);
  opts[1].addEventListener('click', nextQuestion);
  opts[2].addEventListener('click', nextQuestion);
  opts[3].addEventListener('click', nextQuestion);
  opts[4].addEventListener('click', nextQuestion);
}

function init() {
  startBtn.addEventListener('click', startTest);
  handleClickOpts();
}

init();


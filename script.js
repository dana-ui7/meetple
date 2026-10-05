// 예시 모임 데이터
const meetups = [
  { id: 1, title: '주말 한강 러닝 크루', category: '운동', place: '여의도 한강공원', date: '토요일 오전 8시', members: 12, capacity: 20 },
  { id: 2, title: '퇴근 후 JavaScript 스터디', category: '스터디', place: '강남역 스터디카페', date: '수요일 오후 7시 30분', members: 6, capacity: 8 },
  { id: 3, title: '동네 보드게임 모임', category: '취미', place: '홍대 보드게임카페', date: '금요일 오후 8시', members: 5, capacity: 10 },
  { id: 4, title: '한 달에 한 권 독서 모임', category: '독서', place: '성수동 북카페', date: '매월 마지막 일요일', members: 9, capacity: 12 },
  { id: 5, title: '필름카메라 출사 모임', category: '취미', place: '익선동 일대', date: '일요일 오후 2시', members: 4, capacity: 8 },
  { id: 6, title: '아침 요가 클래스', category: '운동', place: '망원동 요가원', date: '화·목 오전 7시', members: 7, capacity: 10 },
];

const state = {
  category: '전체',
  keyword: '',
  joined: new Set(),
};

const listEl = document.getElementById('meetup-list');
const categoriesEl = document.getElementById('categories');
const searchEl = document.getElementById('search');
const emptyEl = document.getElementById('empty');

function renderCategories() {
  const categories = ['전체', ...new Set(meetups.map((m) => m.category))];
  categoriesEl.innerHTML = categories
    .map((c) => `<button class="chip ${c === state.category ? 'is-active' : ''}" data-category="${c}">${c}</button>`)
    .join('');
}

function renderMeetups() {
  const filtered = meetups.filter((m) => {
    const matchCategory = state.category === '전체' || m.category === state.category;
    const matchKeyword = m.title.toLowerCase().includes(state.keyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  emptyEl.hidden = filtered.length > 0;

  listEl.innerHTML = filtered
    .map((m) => {
      const joined = state.joined.has(m.id);
      const count = m.members + (joined ? 1 : 0);
      return `
        <article class="card">
          <span class="card__tag">${m.category}</span>
          <h3>${m.title}</h3>
          <p class="card__meta">📍 ${m.place}<br>🗓 ${m.date}</p>
          <div class="card__footer">
            <span class="card__count">👥 ${count} / ${m.capacity}명</span>
            <button class="btn ${joined ? 'is-joined' : ''}" data-id="${m.id}">
              ${joined ? '참여 중' : '참여하기'}
            </button>
          </div>
        </article>
      `;
    })
    .join('');
}

categoriesEl.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  state.category = chip.dataset.category;
  renderCategories();
  renderMeetups();
});

searchEl.addEventListener('input', (e) => {
  state.keyword = e.target.value.trim();
  renderMeetups();
});

listEl.addEventListener('click', (e) => {
  const button = e.target.closest('button[data-id]');
  if (!button) return;
  const id = Number(button.dataset.id);
  if (state.joined.has(id)) {
    state.joined.delete(id);
  } else {
    state.joined.add(id);
  }
  renderMeetups();
});

renderCategories();
renderMeetups();

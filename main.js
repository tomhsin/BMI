// BMI值計算公式: BMI = 體重(公斤) / 身高2(公尺2)

const resultButton = document.querySelector('.result-btn')
const heightInput = document.getElementById('tall')
const weightInput = document.getElementById('weight')

const resultContainer = document.querySelector('.bmi-result')
const removeButton = document.querySelector('.remove')

let data = JSON.parse(localStorage.getItem('datalist')) || []

// 存取 input 身高體重
let heightValue = ''
let weightValue = ''

// 存取 bmi 樣式類型
let bmiType = ''

resultButton.addEventListener('click', calculate)

// 清除 localStorage 的資料，並更新畫面
removeButton.addEventListener('click', function() {
  localStorage.clear()
  data = []
  updateInfo(data)
})

// 監聽 Input 欄位改變，並存取值
heightInput.addEventListener('change', function(event) {
  consolge.log(event.target.value)
  if(event.target.value<1){
    heightValue = 0
    return
  }else{
  heightValue = event.target.value
  }
})

// 監聽 Input 欄位改變，並存取值
weightInput.addEventListener('change', function(event) {
  consolge.log(event.target.value)
  if(event.target.value<1){
    weightValue = 0
    return
  }else{
  weightValue = event.target.value
  }
})

// 先執行更新，避免 localStorage 有資料無更新的情況
updateInfo(data)

function calculate() {
  // heightValue 資料從 DOM 結構取得，會是字串 (String) 因此需要改為 number 型別
  const heightMeter = Number(heightValue * 0.01)

  // toFixed(1) 取小數點第一位
  // weightValue 資料從 DOM 結構取得，會是字串 (String) 因此需要改為 number 型別
  const bmi = (Number(weightValue) / (heightMeter * heightMeter)).toFixed(1)

  // 驗證 input 欄位不能為空值
  if (heightInput.value === '' || weightInput === '') {
    alert('請輸入身高體重')
    // return 會直接不往下執行
    return
  }

  const bmiInfo = {
    // 身高直接取 input 的 value，因爲 localStorage 要存的是 cm
    height: heightInput.value,
    weight: weightValue,
    bmi,
  }
  data.push(bmiInfo)

  //存取到 localStorage
  localStorage.setItem('datalist', JSON.stringify(data))

  // 存取完進行畫面更新
  updateInfo(data)

  // 計算後要重置 input 的 value
  heightInput.value = ''
  weightInput.value = ''
  window.location.reload()
}

function updateInfo(info) {
  // listDom 為要插入 resultContainer 裡面的 DOM 結構
  let listDom = ''

  // 渲染 DOM 元素
  for (let i = 0; i < data.length; i++) {
    listDom += `
      <li>
        <span class=${getStyleType(data[i].bmi)}></span>
        <div class='list-info'>
          <span>${status}</span>
          <span>BMI: ${data[i].bmi}</span>
          <span>Height: ${data[i].height} cm</span>
          <span>Weight: ${data[i].weight} kg</span>
          <span>${getDate()}</span>
        </div>
      </li>
    `
  }
  // data.length = 0 代表為空陣列，因此可以判斷為無貲料
  if (data.length === 0) {
    resultContainer.innerHTML = `<div>尚無資料</div>`
  } else resultContainer.innerHTML = listDom
}

function getStyleType(bmi) {
  if (bmi >= 40) {
    status = '重度肥胖'
    return 'overWeight'
  }
  if (bmi >= 35) {
    status = '肥胖'
    return 'fat'
  }
  if (bmi >= 25) {
    status = '稍重'
    return 'heavy'
  }
  if (bmi >= 18.5) {
    status = '適中'
    return 'ideal'
  }
  // 若以上都不符合，則為過輕
  status = '過輕'
  return 'skinny'
}

function getDate() {
  const today = new Date()
  const time = `
    ${today.getDate()}-${(today.getMonth() + 1)}-${today.getFullYear()}
  `
  return time
}

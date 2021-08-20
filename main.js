window.addEventListener('DOMContentLoaded', () => {
  let dino = document.querySelector('.dino')
  let grid = document.querySelector('.grid')
  // understand this code more
  let isjumping = false

  let position = 0
  let gravity = 0.9
  let count = 0;
  let isGameOver = false
  // understand the implimentation of gravity here

  const control = (e) => {
    if(e.keyCode === 32) {
      if(!isjumping) {
        isjumping = true
        jump()
      }
    }
  }

  document.addEventListener('keyup', control)


  const jump = () => {
    let jumpUp = setInterval(() => {
      position += 30
      count++
      console.log(count)
      position = position * gravity
      dino.style.bottom = position + 'px'

      if(count === 15) {
        clearInterval(jumpUp)
        let comeDown = setInterval(() => {
          position -= 5
          count--
          console.log(count)
          position = position * gravity
          dino.style.bottom = position + 'px'

          if(count === 0) {
            clearInterval(comeDown)
            isjumping = false
          }
        }, 20)
      }
    }, 20)
  }

  const generateObstacle = () => {
    let randomNum = Math.random() * 4000
    let obstaclePosition = 1000
    const obstacle = document.createElement('div')
    if(!isGameOver) obstacle.classList.add('obstacle')
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + 'px'
    
    let timeObj = setInterval(() => {
      if(obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timeObj)
        console.log('Game Over')
        isGameOver = true

        while (grid.firstChild) {
          grid.removeChild(grid.lastChild)
        }
      }

      obstaclePosition -= 10
      obstacle.style.left = obstaclePosition + 'px'
    }, 20)

    if(!isGameOver) setTimeout(generateObstacle, randomNum)
  }

  generateObstacle()


})





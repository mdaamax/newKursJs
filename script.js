const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const img = new Image()
img.src = 'https://i.ibb.co/FzH4M6c/flappy-bird-set.png'

let gamePlaying = false

const gravity = 0.5,
    speed = 7, // скорость
    size = [51, 36],
    jump = -10, // высота прыжка
    widthBird = canvas.width / 10 // отображение птицы по ширине

let index = 0,
    bestScore = 0,
    flight,
    flyHeight,
    currentScore,
    pipes;

// настройка труб
const pipeWidth = 78,
    pipeGap = 240, // пространтво между трубами
    pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth

const setup = () => {
    currentScore = 0
    flight = jump

    // начальную высоту полета (середина экрана - размер птицы)
    flyHeight = (canvas.height / 2) - (size[1] / 2)

    // 3 трубы
    pipes = Array(3).fill(undefined, undefined, undefined).map((a, i) => [
        canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()
    ])

}

const render = () => {

    // движение экрана
    index++

    // Вывод изображения
    ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        -((index * (speed / 2)) % canvas.width) + canvas.width,
        0,
        canvas.width,
        canvas.height
    )

    // Вывод изображения
    ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height,
        -(index * (speed / 2)) % canvas.width,
        0,
        canvas.width,
        canvas.height
    )

    // pipe display
    if (gamePlaying) {

        pipes.map(pipe => {
            // движение трубы
            pipe[0] -= speed

            // верхняя труба
            ctx.drawImage(
                img,
                432,
                588 - pipe[1],
                pipeWidth,
                pipe[1],
                pipe[0],
                0,
                pipeWidth,
                pipe[1]
            )

            // нижняя труба
            ctx.drawImage(
                img,
                432 + pipeWidth,
                108,
                pipeWidth,
                canvas.height - pipe[1] + pipeGap,
                pipe[0],
                pipe[1] + pipeGap,
                pipeWidth,
                canvas.height - pipe[1] + pipeGap
            )

            // поин + новая труба
            if (pipe[0] <= -pipeWidth) {
                currentScore++
                // проверка рекорда
                bestScore = Math.max(bestScore, currentScore)

                // удалить и создать новую трубу
                console.log(pipes[pipes.length - 1][0])
                pipes = [
                    ...pipes.slice(1),
                    [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]
                ]
            }

            // завершение игры при попадании в трубу
            if (
                [
                    pipe[0] <= widthBird + size[0],
                    pipe[0] + pipeWidth >= widthBird,
                    pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
                ].every(elem => elem)
            ) {
                gamePlaying = false
                setup()
            }

        })

    }

    // отрисовка птицы
    if (gamePlaying) {

        ctx.drawImage(
            img,
            432,
            Math.floor((index % 9) / 3) * size[1],
            ...size,
            widthBird,
            flyHeight,
            ...size
        )
        flight += gravity
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1])

    } else {
        // отрисовка птицы при попадании в трубу
        ctx.drawImage(
            img,
            432,
            Math.floor((index % 9) / 3) * size[1],
            ...size,
            ((canvas.width / 2) - size[0] / 2),
            flyHeight,
            ...size
        )
        flyHeight = (canvas.height / 2) - (size[1] / 2)

        ctx.fillText(`Рекорд: ${bestScore}`, 130, 245)
        ctx.fillText('Нажми на ПКМ', 90, 535)
        ctx.font = "bold 30px courier"

    }

    document.getElementById('bestScore').innerHTML = `Рекорд: ${bestScore}`
    document.getElementById('currentScore').innerHTML = `Текущий счет: ${bestScore}`

    // выполенине анимации
    window.requestAnimationFrame(render)

}

setup()
img.onload = render;

// Старт
document.addEventListener('click', () => gamePlaying = true)
window.onclick = () => flight = jump

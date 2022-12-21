(function () {
    let next_btn = document.querySelector('.next_btn')
    let prev_btn = document.querySelector('.prev_btn')
    let slider = document.querySelector('.Slider')
    let value = 0;
    count = 0
    let dots = document.querySelectorAll('.dot')

    let Interval;

    function StartInterval() {
        Interval = setInterval(() => {
            SwipeRight()
        }, 3000)
    }

    StartInterval();
    
    function SwipeRight() {
        value -= 800;
        count++
        if (count > 5) {
            value = 0
            count = 0
        }
        active_dot(dots[count])
        slider.style.transform = `translateX(${value}px)`
    }

    next_btn.onclick = () => {
        clearInterval(Interval)
        SwipeRight()
        StartInterval();

    }
    prev_btn.onclick = () => {
        clearInterval(Interval)
        StartInterval();
        if (count === 0) {
            value = -800 * 5
            count = 5
        }
        else {
            value += 800;
            count--
        }
        active_dot(dots[count])
        slider.style.transform = `translateX(${value}px)`
    }

    function active_dot(dot) {
        dots.forEach(d => d.classList.remove('active'))
        dot.classList.add('active')
    }
    dots.forEach((dot, i) => {
        dot.onclick = () => {
            clearInterval(Interval)
            StartInterval();
            active_dot(dot)
            value = 0;
            value = -800 * i
            slider.style.transform = `translateX(${value}px)`
            count = i

        }


    });
})()
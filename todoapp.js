document.getElementById('add-task').addEventListener('click', function() {
    const taskText = document.getElementById('new-task').value;
    const isPriority = document.getElementById('priority').checked;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;

    if (taskText === '' || taskDate === '' || taskTime === '') return;

    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');
    newTask.classList.add('task-item');
    if (isPriority) {
        newTask.classList.add('priority');
    }

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    newTask.appendChild(taskContent);

    const countdown = document.createElement('span');
    countdown.className = 'countdown';
    newTask.appendChild(countdown);

    const doneCheckmark = document.createElement('span');
    doneCheckmark.className = 'done-checkmark';
    doneCheckmark.textContent = '✓';
    doneCheckmark.addEventListener('click', function() {
        newTask.classList.toggle('completed');
    });
    newTask.appendChild(doneCheckmark);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(newTask);
    });
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);
    document.getElementById('new-task').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-time').value = '';

    const targetTime = new Date(`${taskDate}T${taskTime}`);

    startCountdown(newTask, countdown, targetTime);
});

function startCountdown(task, countdownElement, targetTime) {
    const interval = setInterval(() => {
        const now = new Date();
        const timeRemaining = (targetTime - now) / 1000;

        if (timeRemaining > 0) {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = Math.floor(timeRemaining % 60);
            countdownElement.textContent = `${minutes}m ${seconds}s`;

            if (timeRemaining <= 1800 && timeRemaining > 1799) {
                alert("30 minutes left to complete your task!");
            }
        } else {
            clearInterval(interval);
            countdownElement.textContent = "Missed!";
            alert(`You missed the task: "${task.querySelector('span').textContent}"`);
        }
    }, 1000);
}

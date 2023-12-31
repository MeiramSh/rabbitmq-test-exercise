# Инструкция по локальному развертыванию

Данная инструкция расчитана для Unix-подобных операционных систем как Linux (Manjaro, Fedora, Mint или Ubuntu) или MacOS. Команды для Windows могут отличаться, но не значительно.

Убедитесь что у вас установлен пакетный менеджер npm, Node.js и RabbitMQ (включая CLI инструменты).

Сперва нужно окрыть терминал.


Необходимо запустить RabbitMQ:
```
sudo rabbitmq-server
```

В отдельном терминале нужно склонировать код из этого репозитория:
```
git clone https://github.com/MeiramSh/rabbitmq-test-exercise
```

Перейти в папку
```
cd rabbitmq-test-exercise
```

Также нужно открыть третий терминал в отдельном окне, так как нам придется запускать 2 сервера.

Не забудьте перейти в папку в третьем терминала:
```
cd rabbitmq-test-exercise
```

Следующую команду достаточно выполнять только в 1 из открытых терминалов (не учитывая терминал в котором запущен rabbitmq-server).

Теперь нужно установить все необходимые зависимости через npm:
```
npm install
```

Запустите первый микросервис:
```
node m1.js
```

Перейдите к другому терминалу (но не тот в котором запущен rabbitmq-server), и запустите второй микросервис:
```
node m2.js
```

Теперь вы можете открыть браузер и протестировать систему как показано в [видео](https://drive.google.com/file/d/1OzJ6Yr_fgtObEEUQF4aj7ivG5F_kjlyB/view?usp=drive_link).

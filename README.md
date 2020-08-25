# Game Plan
<br>

## Description
Share the best improv warm-ups, exercises and scene formats with the world.
Add uploaded games to your lesson plan to put together the perfect improv training.
<br>

## User Stories
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **login-signup** - As a user I want to see a page that lets me easily sign in as an existing user. 
- **signup** - As a user I want to see a page that very briefly explains Game Plan and lets me easily sign up.
- **games-page** - As a user I want to see a page that lets me search and like warm-ups, exercises and scenes by tags and popularity.
- **game-details-page** - As a user I want to see the specs of the game: name, description, purpose, creator and video(optional).
- **new-game-page** - As a user I want to add my own games with specs: name, description, purpose, creator, tags and video(optional).
- **my-lessons-page** - As a user I want to see an overview of all the lessons I have created.
- **new-lesson-page** - As a user I want to be able to change my password and username and potentially connect with other users.
- **lesson-details-page** - As a user I want to see the details of my lessons including: name, description, duration, games and notes.
<br>

## Backlog

 - Comment on games
 - Make lesson plans public
 - Suggestion API (generate random improv suggestions)

<br>

# Client

## Routes (back-end)

- /                 - Home (limited games list)
- /auth/signup      - Signup form
- /auth/login       - Login form
- /games            - games list
- /games/create     - create a game
- /games/:id        - games detail
- /lessons          - my lessons
- /lessons/create   - create a lesson
- /lessons/:id      - lesson detail
- 404


## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Games List Page (public)
- Game Detail Page (public)
- Games Create (user only)
- My lessons (user only)
- Create lesson (user only)
- Lesson details (user only)
- 404 Page (public)


## Components
- LoginPage

- SignupPage

- NavBar

- GamesList

- GameCreate

- GameDetails

- MyLessons

- LessonCreate

- LessonDetails


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Game Plan Service
  - gameplan.filter(warm-up, exercise, scenes) // for different types of games
  - gameplan.game-details(id)
  - gameplan.game-add(id)
  - gameplan.game-edit(id)
  - gameplan.lessons
  - gameplan.lesson-details(id)   
  - gameplan.lesson-add(id)
  - gameplan.lesson-delete(id)
  - gameplan.lesson-edit(id)

<br>

# Server / back end

## Models
 
### User 

```
    new Schema ({
     	_id: ,
      email: String, required: true, unique: true,
      password: String, minlength: 6, maxlength: 12, required: true,
     	username: String, required: true, maxlength: 20
      lessons : Array
		})
```

### Games 
```
    new Schema ({
      _id: ,
      name: String, required: true,
      description: String, required: true,
      purpose: String, required: true,
      credit: String,
      video: String,
      tags: Array, required: true,
    })
```
    
### Lessons 
```
	  new Schema ({
			_id: ,
	    name: String, required: true,
      description: String, required: true,
      length: Number,
      notes: Number,
    })
```
    
<br>

# Links

## Github Client
https://trello.com/b/0b6qhdDv/planning-tool

## Github Client
https://github.com/BodeiBrouwer/Game_Plan-Client

## Github Server
https://github.com/BodeiBrouwer/Game_Plan-server

## Slides
https://docs.google.com/presentation/d/1L63Xgmsu6BMaW9f28KyoThLLVVmRT4_KnsPPFUZItaw/edit?usp=sharing
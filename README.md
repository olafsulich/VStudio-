
## Project title
Site for photographer Andrew Garnicz-Garnicki. Project's has three pages: home,pictures and videos.

## Motivation
This is non-profit site for my friend Andrew. Primary goal for this project was to learn how to work with client and pratice diffrent technologies.I learned also how to dealing with problems. 
 
## Screenshots
![Design](https://i.ibb.co/Q8XmKn6/Screen-Mobile.png)
![Design](https://i.ibb.co/V9xk1Z6/Screen-Mobile2.png)

## Tech/framework used
- HTML5
- SCSS
- ES6+
- [MacyJS](http://macyjs.com/)
- [PaperJS](http://paperjs.org/)
- [Simplex-NoiseJS](https://www.npmjs.com/package/simplex-noise)
- [GSAP](https://greensock.com/gsap/)

## Code Example/Issues

My biggest issue was to implement mouse wheel feature. I found prepared function for that.

```bash
function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
  . ├── gorm.db
    ├── hello.go 
    ├── common │   
    ├── utils.go  //small tools function 
    │   └── database.go /DB connect manager 
    └── users ├── models.go  //data models define & DB operation 
    ├── serializers.go  //response computing & format 
    ├── routers.go      //business logic & router binding 
    ├── middlewares.go  //put the before & after logic of handle request 
    └── validators.go   //form/json checker
```


## Installation
```bash
npm install 
```

## Credits
https://tympanus.net/codrops/ helps me with many problems.


## License
Under license (MIT, Apache etc)

MIT © [Olaf Sulich]()

<template>
  <div id="auth" :class="toggle ? 'sign-up-mode' : ''">
    <section id="login">
      <user-auth></user-auth>
      <article class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here?</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum at
              fuga tempore, magni corporis sunt quos eos modi et amet impedit
              totam!
            </p>
            <button class="btn transparent" id="singin-btn" @click="change">
              Sing up
            </button>
            <img src="images/sing-in.png" alt="image" class="image" />
          </div>
        </div>

        <div class="panel right-panel">
          <div class="content">
            <h3>You already have an open account ?</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum at
              fuga tempore, magni corporis sunt quos eos modi et amet impedit
              totam!
            </p>
            <button class="btn transparent" id="singup-btn" @click="change">
              Sing in
            </button>
            <img src="images/sing-up.png" alt="image" class="image" />
          </div>
        </div>
      </article>
      <user-singup></user-singup>
    </section>
  </div>
</template>

<script>
import UserAuth from "../components/authentication/UserAuth.vue";
import UserSingup from "../components/authentication/UserSingup.vue";
export default {
  components: {
    UserAuth,
    UserSingup,
  },
  data() {
    return {
      toggle: false,
    };
  },

  methods: {
    change() {
      this.toggle = !this.toggle;
    },
  },
};
</script>
<style lang="scss">
.close-btn{
  outline: none;
  border: none;
  cursor: pointer;
  background: transparent;
  position: absolute;
  right:3.5%;
  i{
    color:  #78b8ff;
  }
}
.btn {
  border: none;
  outline: none;
  cursor: pointer;
  width: 9rem;
  height: 3rem;
  border-radius: 3.4rem;
  text-transform: uppercase;
  font-weight: 600;
  margin: 0.6rem;
  transition: 0.35s;
  background-color: #78b8ff;
  &:hover {
    background-color: #61a3fa;
  }
}
#auth {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #edfaff;
  &:before {
    content: "";
    position: absolute;
    width: 2000px;
    height: 2000px;
    border-radius: 50%;
    background: linear-gradient(-45deg, #78b8ff, #61a3fa);
    top: -10%;
    right: 40%;
    transform: translateY(-50%);
    transition: 1.8s ease-in-out;
    z-index: 6;
  }

  .btn {
    border: none;
    outline: none;
    cursor: pointer;
    width: 9rem;
    height: 3rem;
    border-radius: 3.4rem;
    text-transform: uppercase;
    font-weight: 600;
    margin: 0.6rem;
    transition: 0.35s;
    background-color: #78b8ff;
    &:hover {
      background-color: #61a3fa;
    }
  }

  #login {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    h2 {
      color: #444444;
      margin-bottom: 0.6rem;
    }

    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      .input-field {
        max-width: 320px;
        width: 100%;
        height: 3.4rem;
        background: #f0f0f0;
        margin: 0.6rem 0;
        border-radius: 3.4rem;
        display: grid;
        grid-template-columns: 15% 85%;
        padding: 0 0.4rem;
        i {
          text-align: center;
          line-height: 3.4rem;
        }
        input {
          outline: none;
          border: none;
          background: none;
          line-height: 1;
          font-weight: 400;
          color: #333333;
          ::placeholder {
            color: #aaaaaa;
            font-weight: 400;
          }
        }
      }
    }

    .panels-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .panel {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
        text-align: center;
        z-index: 6;
        .content {
          transition: 0.9s 0.6s ease-in-out;
          h3,
          p {
            color: #fff;
          }
          h3 {
            line-height: 1;
            font-weight: 900;
          }
          p {
            padding: 0.7rem 0;
           
          }
          .btn.transparent {
            border: 2px solid #fff;
            background-color: transparent;
            color: #fff;
          }
        }
      }
      .left-panel {
        padding: 3rem 17% 2rem 12%;
      }
      .right-panel {
        padding: 3rem 12% 2rem 17%;
      }
      .image {
        width: 100%;
        transition: 0.9s 0.6s ease-in-out;
      }
    }
  }
}

.singin-singup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}
.sing-in-form {
  z-index: 2;
  // left: 75%;
}
.sign-up-form {
  z-index: 1;
  opacity: 1;
  //left: 25%;
}

/**Animtaions */
#auth.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}
#auth.sign-up-mode .left-panel .image,
#auth.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

#auth .right-panel .image,
#auth .right-panel .content {
  transform: translateX(800px);
}
#auth.sign-up-mode .right-panel .image,
#auth.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

#auth .sign-up-form {
  left: -25%;
}
#auth.sign-up-mode .sign-up-form {
  left: 25%;
}

#auth .sing-in-form {
  left: 75%;
}
#auth.sign-up-mode .sing-in-form {
  left: 125%;
}

#auth .left-panel {
  pointer-events: all;
}

#auth .right-panel {
  pointer-events: none;
}
#auth.sign-up-mode .left-panel {
  pointer-events: none;
}

#auth.sign-up-mode .right-panel {
  pointer-events: all;
}
@media (max-width: 1024px) {
  #auth {
    min-height: 800px;
    height: 100vh;
  }
  #auth:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 50%;
    bottom: 50%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  #auth #login .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  #auth.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 50%;
    right: initial;
  }

  #auth.sign-up-mode .left-panel .image,
  #auth.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  #auth.sign-up-mode .right-panel .image,
  #auth.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }
  #auth .sign-up-form {
    top: 0;
    left: 10%;
    transform: translate(-10%, -50%);
  }

  #auth.sign-up-mode .sign-up-form {
    top: 25%;
    left: 25%;
    transform: translate(-10%, -50%);
  }
  #auth .sing-in-form {
    top: 70%;
    left: 50%;
    transform: translate(-50%, -40%);
  }

  #auth.sign-up-mode .sing-in-form {
    top: 90%;
    left: 50%;
    transform: translate(-10%, -50%);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0;
  }
  #auth {
    padding: 1.5rem;
  }

  #auth:before {
    bottom: 70%;
    left: 50%;
  }

  #auth.sign-up-mode:before {
    bottom: 35%;
    left: 50%;
  }
  .singin-singup {
    width: 80%;
  }
  #auth .sign-up-form {
    top: 0%;
    left: 10%;
    transform: translate(-10%, -50%);
  }

  #auth.sign-up-mode .sign-up-form {
    top: 35%;
    left: 20%;
    transform: translate(-10%, -50%);
  }
  #auth .sing-in-form {
    top: 50%;
    left: 40%;
    transform: translate(-40%, -40%);
  }

  #auth.sign-up-mode .sing-in-form {
    top: 90%;
    left: 50%;
    transform: translate(-10%, -50%);
  }
}
</style>

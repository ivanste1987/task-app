<template>
  <li :class="completed ? 'line-true' : ''" class="task-li">
    <div class="task-content">
      <div class="task-check">
        <input
          type="checkbox"
          class="checkbox"
          @click="changeStatus(_id)"
          :checked="completed"
        />
        <i
          :class="completed ? 'check' : 'blue'"
          class="fas fa-check-square fa-2x"
        ></i>
      </div>
      <div class="task-filed">
        <label for="description" v-if="readonly">{{ description }}</label>
        <input
          type="text"
          class="description"
          name="description"
          :placeholder="description"
          v-model="this.editDescription"
          v-if="!readonly"
        />
      </div>
      <div class="modal-buttons">
        <div class="hiddenButtons" v-if="!readonly">
          <button @click="update(_id)">
            Okey
          </button>
          <button @click="edit()">
            Cancel
          </button>
          <button @click="deleteTask(_id)"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <button class="edit-btn" @click="edit()" >
        <i class="fas fa-edit"></i>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["_id", "completed", "description"],
  data() {
    return {
      readonly: true,
      editDescription: null,
    };
  },
  methods: {
    deleteTask() {
      this.$emit("delete-task", this._id);
    },
    update() {
      this.edit();
      this.$emit("update-task", this._id, this.editDescription);
    },
    changeStatus() {
      this.$emit("change-status", this._id, this.completed);
    },
    edit() {
      this.readonly = !this.readonly;
    },
  },
};
</script>

<style lang="scss">
.task-li {
  border-bottom: 1px solid #cccccc;
  padding: 0.8rem;
  transition: all 0.35s ease-in-out;
  .task-content {
    display: flex;
    align-items: center;
    border-radius: 2rem;
    .task-check {
      flex: 1;
      position: relative;
      input {
        position: absolute;
        top: 0;
        left: 0;
        line-height: 25px;
        width: 25px;
        height: 25px;
        opacity: 0;
      }
    }
    .task-filed {
      flex: 12;
      line-height: 25px;
      width: 25px;
      height: 25px;
      label,
      input {
        width: 100%;
        padding: 0;
        margin: 0;
      }
      input {
        background: transparent;
        border: none;
        outline: none;
        color: #373839;
      }
    }
    .modal-buttons {
      flex: 2;
      display: flex;
      align-items: flex-end;
      position: relative;

      .hiddenButtons {
        position: absolute;
        right: 25px;
        transform: translateY(50%);
        translate: all 0.35s ease-in-out;
        display: flex;
        flex-direction: column;
         padding: 1rem;
         background: #373839;
        border-radius: 25px;
       
        button {
          
          flex: 1;
          border: none;
          outline: none;
          background: #373839;
          padding: 0.5rem;
          color: #fefefe;
           &:nth-child(3){
          border-bottom: 1px solid red;
          color: red;
        }

        }
      }
    }
    .edit-btn {
      width: 25px;
      height: 25px;
      border: none;
      outline: none;
      background: transparent;
      color: #61a3fa;
    }
    // button {
    //     width: 25px;
    //     height: 25px;
    //     border-radius: 100%;
    //     border: none;
    //     outline: none;
    //     background: transparent;
    //     color: #61a3fa;
    //   }
  }
}
.check {
  color: #541e1b;
}
.blue {
  color: #61a3fa;
}
.line-true {
  color: #541e1b;
  text-decoration: line-through;
  background-color: #aed3fc;
  box-shadow: inset 0 0 16px 2px #61a3fa;
  border: none;
  transition: all 0.35s ease-in-out;
  i {
    color: #541e1b;
  }
}
</style>
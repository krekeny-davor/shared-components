import Tools from "../tools.js";
import State from "../state.js";

class Form {
  static rootSelector = ".form";
  static instances = [];

  constructor(root, options) {
    this.root = root;
    this.groups = {};
    this.minLengthOther = 1;
    this.options = options;

    this.addValidation();

    if (!this.options?.noEvents) {
      this.bindEvents();
    }
  }

  bindEvents() {
    if (Object.keys(this.groups).length) {
      this.root.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  handleSubmit(e) {
    this.validate(e);
  }

  submit() {
    this.root.submit();
  }

  triggerExternalValidation() {
    let result = false;

    if (window.$) {
      result = $(this.root).validate().form();
    }

    return result;
  }

  validate(e) {
    let result = true;

    if (!this.isValid(e)) {
      e.stopImmediatePropagation();
      e.preventDefault();

      result = this.triggerExternalValidation();
    }

    return result;
  }

  isValid(e) {
    e.stopImmediatePropagation();

    let result = true;
    let isFirstError = true;

    for (const [key, group] of Object.entries(this.groups)) {
      if (!this.isValidGroup(group)) {
        result = false;

        this.addGroupError(group, isFirstError);

        isFirstError = false;
      }
    }

    return result;
  }

  addGroupError(group, isFirst) {
    const length = group.length;
    const parent = this.getGroupParent(group[0]);

    for (let i = 0; i < length; i++) {
      group[i].classList.add(State.ERROR);
    }

    if (parent) {
      if (isFirst) {
        Tools.scrollIntoView(parent);
      }

      this.addErrorMessage(parent);
    }
  }

  addErrorMessage(element) {
    if (element && !element.classList.contains(State.ERROR)) {
      element.classList.add(State.ERROR);

      const error = document.createElement("div");

      error.innerHTML = element.dataset.msg;
      error.classList.add("invalid-feedback");

      element.parentNode.insertBefore(error, element.nextSibling);
    }
  }

  delErrorMessage(element) {
    if (element && element.classList.contains(State.ERROR)) {
      element.classList.remove(State.ERROR);

      const error = element.nextSibling;

      error.remove();
    }
  }

  delGroupError(group) {
    const length = group.length;
    const parent = this.getGroupParent(group[0]);

    for (let i = 0; i < length; i++) {
      group[i].classList.remove(State.ERROR);
    }

    if (parent) {
      this.delErrorMessage(parent);
    }
  }

  isValidGroup(group) {
    const length = group.length;

    let isValid = false;

    for (let i = 0; i < length; i++) {
      const element = group[i];

      if (element.type === "checkbox" && element.checked) {
        isValid = true;
      } else {
        const otherField = element.closest('input[type="text"]');

        if (
          otherField &&
          !isValid &&
          otherField.value.length >= this.minLengthOther
        ) {
          isValid = true;
        }
      }
    }

    return isValid;
  }

  getGroupByName(name) {
    return this.groups[name];
  }

  addValidation() {
    [].forEach.call(
      this.root.querySelectorAll("[data-form-group]"),
      (input) => {
        if (input.dataset.formGroup) {
          this.addGroupValidation(input);
          this.addLiveValidation(input);
        }
      }
    );
  }

  isCheckbox(element) {
    return element?.getAttribute("type") === "checkbox" ? true : false;
  }

  addLiveValidation(element) {
    if (element) {
      if (this.isCheckbox(element)) {
        element.addEventListener(
          "change",
          this.handleLiveValidation.bind(this)
        );
      } else {
        element.addEventListener("keyup", this.handleLiveValidation.bind(this));
      }
    }
  }

  handleLiveValidation(event) {
    const element = event.currentTarget;

    if (element) {
      const group = this.getGroupByName(element.dataset.formGroup);

      if (element.getAttribute("type") === "checkbox") {
        if (element.checked) {
          this.delGroupError(group);
        } else if (!this.isValidGroup(group)) {
          this.addGroupError(group);
        }
      } else {
        if (this.isValidGroup(group)) {
          this.delGroupError(group);
        } else {
          this.addGroupError(group);
        }
      }
    }
  }

  getGroupParent(element) {
    return element.closest(".js-form-message")?.querySelector("[data-msg]");
  }

  addGroupValidation(element) {
    const parent = this.getGroupParent(element);

    if (parent) {
      const group = element.dataset.formGroup;

      if (!this.groups[group]) {
        this.groups[group] = [];
      }

      this.groups[group].push(element);
    }
  }

  static initElement(element, options) {
    const instance = new this(element, options);

    this.instances.push(instance);

    return instance;
  }

  static init() {
    this.instances = [];

    [].forEach.call(document.querySelectorAll(this.rootSelector), (element) => {
      this.initElement(element);
    });
  }
}

export default Form;

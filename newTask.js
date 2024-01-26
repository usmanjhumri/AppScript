import DomAccess from "src/helper/dom-access.helper";
import FormSerializeUtil from "src/utility/form/form-serialize.util";
import AddToCartPlugin from "src/plugin/add-to-cart/add-to-cart.plugin";
import Iterator from "src/helper/iterator.helper";
import HttpClient from "src/service/http-client.service";
import jqueryNew from "@jqueryNew";

export default class ZaibaAddToCartPlugin extends AddToCartPlugin {
  init() {
    super.init();
    this._client = new HttpClient();
  }
  _openOffCanvasCart(instance, requestUrl, formData) {
    var cart = jqueryNew(".header-cart");
    var isProductPage = document.body.classList.contains("is-ctl-product");

    var isMultipleImages =
      jqueryNew(this.el).find(".gallery-slider-item").length > 1;

    if (isProductPage) {
      var imgtodrag;

      if (isMultipleImages) {
        imgtodrag = jqueryNew(
          ".gallery-slider-item .js-magnifier-container"
        );
      } else {
        imgtodrag = jqueryNew(
          ".gallery-slider-item.is-contain.js-magnifier-container"
        );
      }
    } else {
      var imgtodrag = jqueryNew(this.el)
        .closest(".product-box")
        .find(".product-image")
        .eq(0);
    }
    if (isProductPage) {
      if (
        this.options.disableFlyCartOnProductDetail ==
        "disableFlyCartOnAllScreens"
      ) {
      } else if (
        this.options.disableFlyCartOnProductDetail == "disableFlyCartOnDesktop"
      ) {
        if (screen.availWidth > 767) {
        } else {
          // var cart = jqueryNew('.header-cart');
          // var imgtodrag = jqueryNew(this.el).closest('.product-box').find('.product-image').eq(0);
          if (imgtodrag.length) {
            var imgclone = imgtodrag
              .clone()
              .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left,
              })
              .css({
                opacity: this.options.opacity,
                position: "absolute",
                height: this.options.height,
                width: this.options.width,
                "z-index": this.options.zIndex,
              })
              .appendTo(jqueryNew("body"))
              .animate(
                {
                  top: cart.offset().top + 10,
                  left: cart.offset().left + 10,
                  width: 75,
                  height: 75,
                },
                this.options.moveSpeedOnProductDetail
              );

            imgclone.animate(
              {
                width: 0,
                height: 0,
              },
              function () {
                jqueryNew(this).detach();
              }
            );
          }
        }
      } else if (
        this.options.disableFlyCartOnProductDetail == "disableFlyCartOnMobile"
      ) {
        if (screen.availWidth < 767) {
        } else {
          // var cart = jqueryNew('.header-cart');
          // var imgtodrag = jqueryNew(this.el).closest('.product-box').find('.product-image').eq(0);
          if (imgtodrag.length) {
            var imgclone = imgtodrag
              .clone()
              .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left,
              })
              .css({
                opacity: this.options.opacity,
                position: "absolute",
                height: this.options.height,
                width: this.options.width,
                "z-index": this.options.zIndex,
              })
              .appendTo(jqueryNew("body"))
              .animate(
                {
                  top: cart.offset().top + 10,
                  left: cart.offset().left + 10,
                  width: 75,
                  height: 75,
                },
                this.options.moveSpeedOnProductDetail
              );

            imgclone.animate(
              {
                width: 0,
                height: 0,
              },
              function () {
                jqueryNew(this).detach();
              }
            );
          }
        }
      } else {
        // var cart = jqueryNew('.header-cart');
        // var imgtodrag = jqueryNew(this.el).closest('.product-box').find('.product-image').eq(0);

        if (imgtodrag.length) {
          var imgclone = imgtodrag
            .clone()
            .offset({
              top: imgtodrag.offset().top,
              left: imgtodrag.offset().left,
            })
            .css({
              opacity: this.options.opacity,
              position: "absolute",
              height: this.options.height,
              width: this.options.width,
              "z-index": this.options.zIndex,
            })
            .appendTo(jqueryNew("body"))
            .animate(
              {
                top: cart.offset().top + 10,
                left: cart.offset().left + 10,
                width: 75,
                height: 75,
              },
              this.options.moveSpeedOnProductDetail
            );

          imgclone.animate(
            {
              width: 0,
              height: 0,
            },
            function () {
              jqueryNew(this).detach();
            }
          );
        }
      }
    } else {
      if (this.options.disableFlyCart == "disableFlyCartOnAllScreens") {
      } else if (this.options.disableFlyCart == "disableFlyCartOnDesktop") {
        if (screen.availWidth > 767) {
        } else {
          // var cart = jqueryNew('.header-cart');
          // var imgtodrag = jqueryNew(this.el).closest('.product-box').find('.product-image').eq(0);
          if (imgtodrag.length) {
            var imgclone = imgtodrag
              .clone()
              .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left,
              })
              .css({
                opacity: this.options.opacity,
                position: "absolute",
                height: this.options.height,
                width: this.options.width,
                "z-index": this.options.zIndex,
              })
              .appendTo(jqueryNew("body"))
              .animate(
                {
                  top: cart.offset().top + 10,
                  left: cart.offset().left + 10,
                  width: 75,
                  height: 75,
                },
                this.options.speed
              );

            imgclone.animate(
              {
                width: 0,
                height: 0,
              },
              function () {
                jqueryNew(this).detach();
              }
            );
          }
        }
      } else if (this.options.disableFlyCart == "disableFlyCartOnMobile") {
        if (screen.availWidth < 767) {
        } else {
          // var cart = jqueryNew('.header-cart');
          // var imgtodrag = jqueryNew(this.el).closest('.product-box').find('.product-image').eq(0);
          if (imgtodrag.length) {
            var imgclone = imgtodrag
              .clone()
              .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left,
              })
              .css({
                opacity: this.options.opacity,
                position: "absolute",
                height: this.options.height,
                width: this.options.width,
                "z-index": this.options.zIndex,
              })
              .appendTo(jqueryNew("body"))
              .animate(
                {
                  top: cart.offset().top + 10,
                  left: cart.offset().left + 10,
                  width: 75,
                  height: 75,
                },
                this.options.speed
              );

            imgclone.animate(
              {
                width: 0,
                height: 0,
              },
              function () {
                jqueryNew(this).detach();
              }
            );
          }
        }
      } else {
        // var cart = jqueryNew('.header-cart');
        // var imgtodrag = jqueryNew(this.el).closest('.product-box').find('.product-image').eq(0);

        if (imgtodrag.length) {
          var imgclone = imgtodrag
            .clone()
            .offset({
              top: imgtodrag.offset().top,
              left: imgtodrag.offset().left,
            })
            .css({
              opacity: this.options.opacity,
              position: "absolute",
              height: this.options.height,
              width: this.options.width,
              "z-index": this.options.zIndex,
            })
            .appendTo(jqueryNew("body"))
            .animate(
              {
                top: cart.offset().top + 10,
                left: cart.offset().left + 10,
                width: 75,
                height: 75,
              },
              this.options.speed
            );

          imgclone.animate(
            {
              width: 0,
              height: 0,
            },
            function () {
              jqueryNew(this).detach();
            }
          );
        }
      }
    }
    if (this._form.querySelector(".btn-buy")) {
      this._form.querySelector(".btn-buy").setAttribute("disabled", "disabled");
    }

    if (isProductPage) {
      if (
        this.options.disableCartSidebarOnProductDetail ==
        "disableCartSidebarOnAllScreens"
      ) {
        this._client.post(requestUrl, formData, (response) => {
          const CartWidgetPluginInstances =
            PluginManager.getPluginInstances("CartWidget");
          Iterator.iterate(CartWidgetPluginInstances, (instance) =>
            instance.fetch()
          );

          this.$emitter.publish("fetchCartWidgets");
          this.$emitter.publish("openOffCanvasCart");

          if (this._form.querySelector(".btn-buy")) {
            this._form.querySelector(".btn-buy").removeAttribute("disabled");
          }
        });
      } else if (
        this.options.disableCartSidebarOnProductDetail ==
        "disableCartSidebarOnDesktop"
      ) {
        if (screen.availWidth < 767) {
          instance.openOffCanvas(requestUrl, formData, () => {
            this.$emitter.publish("openOffCanvasCart");
            if (this._form.querySelector(".btn-buy")) {
              this._form.querySelector(".btn-buy").removeAttribute("disabled");
            }
          });
        } else {
          this._client.post(requestUrl, formData, (response) => {
            const CartWidgetPluginInstances =
              PluginManager.getPluginInstances("CartWidget");
            Iterator.iterate(CartWidgetPluginInstances, (instance) =>
              instance.fetch()
            );

            this.$emitter.publish("fetchCartWidgets");
            this.$emitter.publish("openOffCanvasCart");

            if (this._form.querySelector(".btn-buy")) {
              this._form.querySelector(".btn-buy").removeAttribute("disabled");
            }
          });
        }
      } else if (
        this.options.disableCartSidebarOnProductDetail ==
        "disableCartSidebarOnMobile"
      ) {
        if (screen.availWidth > 767) {
          instance.openOffCanvas(requestUrl, formData, () => {
            this.$emitter.publish("openOffCanvasCart");
            if (this._form.querySelector(".btn-buy")) {
              this._form.querySelector(".btn-buy").removeAttribute("disabled");
            }
          });
        } else {
          this._client.post(requestUrl, formData, (response) => {
            const CartWidgetPluginInstances =
              PluginManager.getPluginInstances("CartWidget");
            Iterator.iterate(CartWidgetPluginInstances, (instance) =>
              instance.fetch()
            );

            this.$emitter.publish("fetchCartWidgets");
            this.$emitter.publish("openOffCanvasCart");

            if (this._form.querySelector(".btn-buy")) {
              this._form.querySelector(".btn-buy").removeAttribute("disabled");
            }
          });
        }
      } else {
        instance.openOffCanvas(requestUrl, formData, () => {
          this.$emitter.publish("openOffCanvasCart");
          if (this._form.querySelector(".btn-buy")) {
            this._form.querySelector(".btn-buy").removeAttribute("disabled");
          }
        });
      }
    } else {
      if (this.options.disableCartSidebar == "disableCartSidebarOnAllScreens") {
        this._client.post(requestUrl, formData, (response) => {
          const CartWidgetPluginInstances =
            PluginManager.getPluginInstances("CartWidget");
          Iterator.iterate(CartWidgetPluginInstances, (instance) =>
            instance.fetch()
          );

          this.$emitter.publish("fetchCartWidgets");
          this.$emitter.publish("openOffCanvasCart");

          if (this._form.querySelector(".btn-buy")) {
            this._form.querySelector(".btn-buy").removeAttribute("disabled");
          }
        });
      } else if (
        this.options.disableCartSidebar == "disableCartSidebarOnDesktop"
      ) {
        if (screen.availWidth < 767) {
          instance.openOffCanvas(requestUrl, formData, () => {
            this.$emitter.publish("openOffCanvasCart");
            if (this._form.querySelector(".btn-buy")) {
              this._form.querySelector(".btn-buy").removeAttribute("disabled");
            }
          });
        } else {
          this._client.post(requestUrl, formData, (response) => {
            const CartWidgetPluginInstances =
              PluginManager.getPluginInstances("CartWidget");
            Iterator.iterate(CartWidgetPluginInstances, (instance) =>
              instance.fetch()
            );

            this.$emitter.publish("fetchCartWidgets");
            this.$emitter.publish("openOffCanvasCart");

            if (this._form.querySelector(".btn-buy")) {
              this._form.querySelector(".btn-buy").removeAttribute("disabled");
            }
          });
        }
      } else if (
        this.options.disableCartSidebar == "disableCartSidebarOnMobile"
      ) {
        if (screen.availWidth > 767) {
          instance.openOffCanvas(requestUrl, formData, () => {
            this.$emitter.publish("openOffCanvasCart");
            if (this._form.querySelector(".btn-buy")) {
              this._form.querySelector(".btn-buy").removeAttribute("disabled");
            }
          });
        } else {
          this._client.post(requestUrl, formData, (response) => {
            const CartWidgetPluginInstances =
              PluginManager.getPluginInstances("CartWidget");
            Iterator.iterate(CartWidgetPluginInstances, (instance) =>
              instance.fetch()
            );

            this.$emitter.publish("fetchCartWidgets");
            this.$emitter.publish("openOffCanvasCart");

            if (this._form.querySelector(".btn-buy")) {
              this._form.querySelector(".btn-buy").removeAttribute("disabled");
            }
          });
        }
      } else {
        instance.openOffCanvas(requestUrl, formData, () => {
          this.$emitter.publish("openOffCanvasCart");
          if (this._form.querySelector(".btn-buy")) {
            this._form.querySelector(".btn-buy").removeAttribute("disabled");
          }
        });
      }
    }
  }
}

<script>
        'use strict';


        $('body').on('change', '.productbump', function() {
            let p_price = parseFloat($('#product-price').text().replace('$', ''));

            let pre = $(this);
            let pages = parseInt(pre.attr('data-inputpage'))
            let toAdd = parseFloat($(this).val());
            if (pages > 0) {
                let pin = $('.pageinput').val();
                if (is_undefined(pin) || pin == 0 || pin == '0' || pin <
                    pages) {
                    alert("please enter a valid quantity first !");
                    $(this).prop('checked', false);
                    return;
                }

                let qty = parseInt($('.pageinput').val());
                toAdd *= qty;

            }
            let bum_fee = parseFloat($('#bumb_fees').val());
            if (pre.is(':checked')) {
                bum_fee += toAdd;
                p_price += toAdd;
                $('body').on('change', '.pageinput', function(e) {

                })
            } else {
                bum_fee -= toAdd;
                p_price -= toAdd;
            }
            $('#bumb_fees').val(bum_fee);
            $('#product-price').text(
                `{{ $general->cur_sym }} ${p_price}`);

        });

        function onChangePageinput(input) {
            let pre = $('.pageinput').closest('.form-check-label').find('.productbump');
            if (pre.is(':checked')) {
                console.log("New value: " + input.value + "\n" + "Old value: " + input.oldvalue);
                let pages = parseInt($('.productbump').attr('data-inputpage'))
                var newpin = input.value;
                var oldpin = input.oldvalue;
                let toAdd = parseFloat(pre.val());
                if (is_undefined(newpin) || newpin == 0 || newpin == '0' || newpin <
                    pages) {
                    alert("please enter a valid quantity first !");
                    $(this).prop('checked', false);
                    return;
                } else {
                    let bum_fee = parseFloat($('#bumb_fees').val());
                    let p_price = parseFloat($('#product-price').text().replace('$', ''));
                    let oldbumpprice = oldpin * toAdd;
                    let newbumpprice = newpin * toAdd;
                    p_price = p_price - oldbumpprice;
                    p_price = p_price + newbumpprice;
                    bum_fee = bum_fee - oldbumpprice;
                    bum_fee = bum_fee + newbumpprice;
                    $('#bumb_fees').val(bum_fee);
                    $('#product-price').text(
                        `{{ $general->cur_sym }} ${p_price}`);
                }
            }
        }
    </script>
const observer = new MutationObserver(function (mutations, mutationInstance) {
    const someDiv = document.querySelector('input[name="transactions[0].amount"]');
    const otherDiv = document.querySelector('.Polaris-ShadowBevel_1hoxq .Polaris-BlockStack_1wvut .Polaris-BlockStack_1wvut .Polaris-Bleed_2ppoe');
    if (otherDiv) {
        let div = document.createElement("div");
        div.className = "extensionCheckboxDiv";
        let htmlString = '<label class="Polaris-Choice_j5gzq" for="extensionCheckbox"><span class="Polaris-Choice__Control_1u8vs"><span class="Polaris-Checkbox_1d6zr"><input id="extensionCheckbox" type="checkbox" class="Polaris-Checkbox__Input_30ock" aria-invalid="false" role="checkbox" value=""><span class="Polaris-Checkbox__Backdrop_1x2i2"></span><span class="Polaris-Checkbox__Icon_yj27d"><span class="Polaris-Icon_yj27d"><span class="Polaris-VisuallyHidden_yrtt5"></span><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M14.723 6.237a.94.94 0 0 1 .053 1.277l-5.366 6.193a.834.834 0 0 1-.611.293.83.83 0 0 1-.622-.264l-2.927-3.097a.94.94 0 0 1 0-1.278.82.82 0 0 1 1.207 0l2.297 2.43 4.763-5.498a.821.821 0 0 1 1.206-.056Z"></path></svg></span></span></span></span><span class="Polaris-Choice__Label_2vd36">Set the refund amount to 95% of total amount.</span></label>';
        div.innerHTML = htmlString.trim();
        otherDiv.appendChild(div);
        mutationInstance.disconnect();
    }
});

function addElement() {
    const otherDiv = document.querySelector('.Polaris-ShadowBevel_1hoxq .Polaris-BlockStack_1wvut .Polaris-BlockStack_1wvut .Polaris-Bleed_2ppoe');
    if (otherDiv) {
        let div = document.createElement("div");
        div.className = "extensionCheckboxDiv";
        let htmlString = '<label class="Polaris-Choice_j5gzq" for="extensionCheckbox"><span class="Polaris-Choice__Control_1u8vs"><span class="Polaris-Checkbox_1d6zr"><input id="extensionCheckbox" type="checkbox" class="Polaris-Checkbox__Input_30ock" aria-invalid="false" role="checkbox" value=""><span class="Polaris-Checkbox__Backdrop_1x2i2"></span><span class="Polaris-Checkbox__Icon_yj27d"><span class="Polaris-Icon_yj27d"><span class="Polaris-VisuallyHidden_yrtt5"></span><svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M14.723 6.237a.94.94 0 0 1 .053 1.277l-5.366 6.193a.834.834 0 0 1-.611.293.83.83 0 0 1-.622-.264l-2.927-3.097a.94.94 0 0 1 0-1.278.82.82 0 0 1 1.207 0l2.297 2.43 4.763-5.498a.821.821 0 0 1 1.206-.056Z"></path></svg></span></span></span></span><span class="Polaris-Choice__Label_2vd36">Set the refund amount to 95% of total amount.</span></label>';
        div.innerHTML = htmlString.trim();
        otherDiv.appendChild(div);
    }
}

observer.observe(document, {
    childList: true,
    subtree:   true
});

function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    var sign = number < 0 ? "-" : "";
    var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    var j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

window.addEventListener('mousemove',function(e){
    const AlreadyAddElement = document.getElementsByClassName('extensionCheckboxDiv');
    if (AlreadyAddElement.length == 0 && window.location.href.includes('refund')) {
        addElement();
    }
});

function handleSomeDiv(someDiv, isChecked) {
    let refundFull = Number(someDiv.replace(/\,/g,''));
    let refundDescreased = isChecked ? Number(someDiv.replace(/\,/g,'')) * 0.95 : Number(someDiv.replace(/\,/g,'')) / 0.95;
    document.querySelector('input[name="transactions[0].amount"]').value = someDiv.charAt(0) + formatMoney(refundDescreased.toFixed(2));
    document.querySelector("span[class^=\"Polaris-Button__Text_\"]").innerHTML = 'Refund ' + someDiv.charAt(0) + formatMoney(refundDescreased.toFixed(2));

    var allTextInputs = document.querySelectorAll('input[type="text"]');
    lastInput = allTextInputs[allTextInputs.length - 1];
    console.log(lastInput.value);
    lastInputLabel = lastInput.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerHTML

    if (lastInputLabel !== undefined && lastInputLabel.includes("Gift")) {
        let creditCardRefund = isChecked ? refundFull * 0.95 : refundFull / 0.95;
        refundDescreased = parseFloat(lastInput.value) + creditCardRefund;
        
    console.log(creditCardRefund);
    console.log(refundDescreased);
        document.querySelector('input[name="transactions[0].amount"]').value = someDiv.charAt(0) + formatMoney(refundDescreased.toFixed(2));
        document.querySelector("span[class^=\"Polaris-Button__Text_\"]").innerHTML = 'Refund ' + someDiv.charAt(0) + formatMoney(refundDescreased.toFixed(2));

        paymentInput = allTextInputs[allTextInputs.length - 2];
        paymentInput.value = creditCardRefund;

        theKey = 'Tab';
        attributes = {
            bubbles: true,
            key: theKey,
            keyCode: 9,
            charCode: 0,
        };
        var e = new window.KeyboardEvent('focus', attributes);
        paymentInput.dispatchEvent(e);
        e = new window.KeyboardEvent('keydown', attributes);
        paymentInput.dispatchEvent(e);
        e = new window.KeyboardEvent('beforeinput', attributes);
        paymentInput.dispatchEvent(e);
        e = new window.KeyboardEvent('keypress', attributes);
        paymentInput.dispatchEvent(e);
        e = new window.KeyboardEvent('input', attributes);
        paymentInput.dispatchEvent(e);
        e = new window.KeyboardEvent('change', attributes);
        paymentInput.dispatchEvent(e);
        e = new window.KeyboardEvent('keyup', attributes);
        paymentInput.dispatchEvent(e);
        paymentInput.focus();
        paymentInput.blur();

    } else {
        lastInput.value = refundDescreased.toFixed(2);

        theKey = 'Tab';
        attributes = {
            bubbles: true,
            key: theKey,
            keyCode: 9,
            charCode: 0,
        };
        var e = new window.KeyboardEvent('focus', attributes);
        lastInput.dispatchEvent(e);
        e = new window.KeyboardEvent('keydown', attributes);
        lastInput.dispatchEvent(e);
        e = new window.KeyboardEvent('beforeinput', attributes);
        lastInput.dispatchEvent(e);
        e = new window.KeyboardEvent('keypress', attributes);
        lastInput.dispatchEvent(e);
        e = new window.KeyboardEvent('input', attributes);
        lastInput.dispatchEvent(e);
        e = new window.KeyboardEvent('change', attributes);
        lastInput.dispatchEvent(e);
        e = new window.KeyboardEvent('keyup', attributes);
        lastInput.dispatchEvent(e);
        lastInput.focus();
        lastInput.blur();
    }
}

window.addEventListener('click',function(e){
    if(e.target.tagName == 'svg') {
        let isExtensionCheckBox = document.querySelector('input[id^=\"extensionCheckbox\"]');
        if (isExtensionCheckBox){
            isExtensionCheckBox.checked = false;
        }  
    }
    const someDiv = document.querySelector('input[name="transactions[0].amount"]');

    if(e.target.id !== undefined && e.target.id.includes('extensionCheckbox') && someDiv) {
        handleSomeDiv(someDiv.value, document.getElementById("extensionCheckbox").checked);
    }
});
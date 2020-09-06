/*calculator functionality*/

let input_var = "";
let show_input = "";
let flag = 0;
var ans;

//ALLOWS YOU TO TYPE IN THE INPUT
function get_direct(){
    if(document.getElementById("answer").value != ""){
        input_var = document.getElementById("answer").value;
        show_input = input_var;
    }
}

//ALLOWS YOU TO CLEAR THE INPUT
function clear_input(){
    input_var = "";
    document.getElementById("answer").value = input_var;
}

//ADDS STRING TO INPUT AS A POSTFIX
function concat_to_input(elem){
    if(flag == 1){
        clear_input();
        flag = 0;
    }
    input_var +=elem;
    document.getElementById("answer").value = input_var;
    return input_var;
}

//ADDS STRING TO INPUT AS A POSTFIX
function apply_on_input(elem){
    input_var = elem + input_var;
    return input_var;
}

//EVALUATES THE ANSWER FROM THE INPUT - MAIN FUNCTION
function find_answer(){
    if(input_var.includes("%"))
        input_var = input_var.replace("%","*0.01*");
    else if(input_var.includes('SQRT')){
        sqrt();
        console.log(input_var);
    }
    input_var = eval(input_var);
    document.getElementById("answer").value = input_var;
    flag = 1;
    return input_var;
}

//MODIFIES INPUT VARIABLE FOR EVALUATION SUCH THAT SQRT IS CALCULATED
function sqrt(){
    let sqrt_no = parseFloat(input_var.replace("SQRT",""));
    console.log(sqrt_no);
    input_var = Number.isInteger(Math.sqrt(sqrt_no))?Math.sqrt(sqrt_no):Math.sqrt(sqrt_no).toFixed(3);
    return input_var;
}

//MODIFIES INPUT VARIABLE FOR EVALUATION SUCH THAT ABS IS CALCULATED
function abs()
{
    apply_on_input('Math.abs(');
    show_input = "abs("+input_var+")";
    document.getElementById("answer").value = show_input;
    concat_to_input(')');
    return input_var;
}
/*end of calculator*/

/* start of form validation */
function validate_form(){
    return validate_name() && validate_number() && validate_email();
}
//validation of name 
function validate_name(){
    let name = document.getElementById("name").value;
    //console.log(name.match(/\b[0-9]/)==null);
    if(name.match(/\b[0-9]/) != null)
        alert('Name must not start with a number');
    return (name.match(/\b[0-9]/) == null);
}
//validation of number 
function validate_number(){
    let phno = document.getElementById("phno").value;
    if(Boolean(phno.match(/\D/)) || phno.length != 10){
        alert('Enter 10-digit Phone Number');
    }
    //console.log(!Boolean(phno.match(/\D/)) && phno.length == 10);
    return (!Boolean(phno.match(/\D/)) && phno.length == 10);
}
//validation of email
function validate_email(){
    let email =document.getElementById("email").value;
    if(!Boolean(email.match(/[\.]/g))||!Boolean(email.match(/[\@]/g))){
        alert("Email URL doesn't contain sufficient '@' or '.' symbols");
        return false;
    }
    return true;
}

/* end of form validation */

//start of task 3 - part 1 - palindrome 
//MAIN FUNCTION FOR PALINDROME
function checkIfPalindrome(){
    let word = String.prototype.toLowerCase.apply(document.getElementById('pword1').value);
    let rev_word = word.split("").reverse().join("");
    console.log(rev_word);
    console.log(word);
    console.log(rev_word == word);
    return (rev_word == word);
}

//end of task3 - part1 - palindrome

//start of task3 - part2 - anagram

/*helper functions*/

//getCharMap function used to get a character map (character-count pairs) of the string
function getCharMap(string){
    let charMap = {};
    for(let x of string){
        if(x in charMap)
            charMap[x]++;
        else
            charMap[x] = 1;
    }
    //console.log(charMap);
    return charMap;
}

//cleanString function used to remove spaces, convert string to lower case
function cleanString(string){
    return String.prototype.toLowerCase.apply(string.replace(' ', ''));
}
/*end of helper functions*/
//MAIN FUNCTION FOR ANAGRAM
function checkIfAnagram(){
    let string = cleanString(document.getElementById('astring').value);
    let word = cleanString(document.getElementById('aword').value);
    if(string.length == word.length){
        let stringCharMap = getCharMap(string);
        let wordCharMap = getCharMap(word);
        for(let char in stringCharMap){
            if(stringCharMap[char] !== wordCharMap[char]){
                return false;
            }
        }
        return true;
    }
    else
        return false;
}
//end of task3 - part2

//Start of task 4
let obj1_no,obj2_no,obj1,obj2, survivor;
let objects = {0:'Human',1:'Cockroach',2:'Nuclear Bomb'};

function getRandNo(objname){
    let val = Math.floor((Math.random() * 1000) + 1);
    eval(objname.replace("-","_")+"=val");
    document.getElementById(objname).value = val;
    eval(objname.replace("-no","")+"=objects[val%3]");
    console.log(objname);
    eval("document.getElementById('"+objname.replace("no","title")+"').innerHTML ="+objname.replace("-no",""));
    return val;
}

function getObjects(){
    obj1_no = document.getElementById('obj1-no').value;
    obj2_no = document.getElementById('obj2-no').value;
    if(obj1_no==""||obj2_no==""){
        alert('Enter values or use random number generator!');
        return 0;
    }
    obj1 = objects[obj1_no%3];
    obj2 = objects[obj2_no%3];
    document.getElementById('obj1-title').innerHTML = obj1;
    document.getElementById('obj2-title').innerHTML = obj2; 
    return {'obj1':obj1, 'obj2':obj2};
}
//MAIN FUNCTION 
function getSurvivor(){
    getObjects();
    if(obj1 == obj2)
        survivor = "TIE";
    if([objects[0],objects[1]].includes(obj1) && [objects[0],objects[1]].includes(obj2))
        survivor = obj1;
    else if ([objects[1],objects[2]].includes(obj1) && [objects[1],objects[2]].includes(obj2))
        survivor = objects[1];
    else if ([objects[0],objects[2]].includes(obj1) && [objects[0],objects[2]].includes(obj2))
        survivor = objects[2];
    console.log(survivor);
    document.getElementById('survivor').innerHTML = survivor;
    return survivor;
}
//end of task 4

//start of task 5

var getJSON = function(url, country, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    
    xhr.onload = function() {
    
        var status = xhr.status;
        
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

function get_data(){
    var e = document.getElementById("your-curr-type");
    var strUser = e.options[e.selectedIndex].value;
    let myval = parseFloat(document.getElementById('your-curr-val').value);
    console.log(myval);
    let mycountry = document.getElementById('your-curr-type').value;
    console.log(mycountry);
    let newcountry = document.getElementById('your-new-val').value;
    console.log(newcountry);
    let country = mycountry+'_'+newcountry;
    let url = 'https://free.currconv.com/api/v7/convert?q='+country+'&compact=ultra&apiKey=ecd96f38ab9cbbe978b7';
    getJSON(url, country, function(err,data){
        if (err != null) {
            console.error(err);
        } else {
            var text = data[country];
            console.log(text);
        }
        let multval = parseFloat(text);
        document.getElementById('CURR_VAL').innerHTML = multval*myval+' '+newcountry;
    });
    let finalval = document.getElementById('CURR_VAL').innerHTML;
    console.log(finalval);
    return finalval;

}
//end of task5






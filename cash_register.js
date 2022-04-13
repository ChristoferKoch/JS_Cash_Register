/*Project for the fulfillment of the freeCodeCamp JavaScript Algorithms and Data Structures certification.

Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument
(price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due,
or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal
to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills,
sorted in highest to lowest order, as the value of the change key.*/

function checkCashRegister(price, cash, cid) {
    let changeDue = cash - price, total = 0;
    const cashback = {status: "", change: [], totalcid: };
    const cashValue = {
        "PENNY": .01,
        "NICKEL": .05,
        "DIME": .10,
        "QUARTER": .25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
      };//To look up the values of change in the cash register

    if(cash < price){
      let remainingBalance = price - cash;
      remainingBalance = remainingBalance.toFixed(2);
      return ["INSUFFICIENT_PAYMENT", remainingBalance];//Since the register shouldn't be changed by this, I chose to return an array that simply says how much more is needed.
    }

    for(let i = 0; i < cid.length; i++){
      total += cid[i][1];
    }
    total = total.toFixed(2);//Keeps the change calculated to two decimal places
  
    if(total < changeDue){//Check that there is enough money in the drawer to make the change
      cashback.status = "INSUFFICIENT_FUNDS";
      return cashback;
    } else if(total === changeDue.toFixed(2)){//Check if the register needs to be closed
      cashback.status = "CLOSED";
      cashback.change = cid;
      cashback.totalcid = cash;
      return cashback;
    } else{
      cashback.status = "OPEN";
    }

    total += cash;
    total = total.toFixed(2);//Updates the total cid to reflect influx of cash
  
    cid = cid.reverse();//To iterate through the cash register from highest to lowest value
    for (let element of cid) {
      let temp = [element[0], 0];//A temporary array to store the value of the change of a given type
      while (changeDue >= cashValue[element[0]] && element[1] > 0) {//Checks that the type of change can be used
        temp[1] += cashValue[element[0]];//Adds to temp a value equal to the value of the type of change each loop
        element[1] -= cashValue[element[0]];//Updates the cid for a given element
        total -= cashValue[element[0]];//Updates total cid
        total = total.toFixed(2);
        changeDue -= cashValue[element[0]];//Updates how much change is due
        changeDue = changeDue.toFixed(2);
      }
      if (temp[1] > 0) {
        cashback.change.push(temp);//If a given type of change was used, the array temp is pushed
      }
    }
    cashback.totalcid = total;
    if (changeDue > 0) {//Final check that the kind of change in the drawer is sufficient
      cashback.status = "INSUFFICIENT_FUNDS";
      cashback.change = [];
    return cashback;
  }
  
    return cashback;
  }
  
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
const xlsx = require( "xlsx" );

class Data_Control {
    
    constructor() {
        this.attend_coin = 0
        this.User_Data = {};
        this.goods = {};
        this.load();
    }

    save = () => {
        const book = xlsx.utils.book_new();

        var data = [
            [
                "이름",
                "코인",
                "경고 1회 차감권",
                "출석날짜",
                "출첵",
                "처음 출현 날짜",
                "대화수"
            ]
        ]

        for(var user in this.User_Data){
            var name = user;
            var coin = this.User_Data[user]["coin"];
            var warning_down = this.User_Data[user]["warning_down"];
            var att_date  = this.User_Data[user]["att_date"];
            var att_count  = this.User_Data[user]["att_count"];
            var first_ac  = this.User_Data[user]["first_ac"];
            var chat_count = this.User_Data[user]["chat_count"];

            var temp = [name, coin, warning_down, att_date, att_count, first_ac, chat_count]
            data.push(temp)
        }

        console.log(data)

        const xlsx_data = xlsx.utils.aoa_to_sheet(data);
        xlsx.utils.book_append_sheet( book, xlsx_data, "DATA");
        xlsx.writeFile( book, "data.xlsx" ); 

        console.log("save complete.");
    }

    load = () => {
        this.goods = require('./goods.json');

        try {

            const excelFile = xlsx.readFile("data.xlsx");
            const sheetName = excelFile.SheetNames[0];       
            const firstSheet = excelFile.Sheets[sheetName]; 
            const Temp_Data = xlsx.utils.sheet_to_json( firstSheet, { defval : "" } );

            for( var num in Temp_Data ){
                var name = Temp_Data[num]["이름"];
                var coin = Temp_Data[num]["코인"];
                var warning_down = Temp_Data[num]["경고 1회 차감권"];
                var att_date  = Temp_Data[num]["출석날짜"];
                var att_count  = Temp_Data[num]["출첵"];
                var first_ac  = Temp_Data[num]["처음 출현 날짜"];
                var chat_count = Temp_Data[num]["대화수"];
                
                // console.log(typeof(name))

                if(name == undefined) break;
                // console.log(name)

                this.User_Data[name] = {
                    "coin" : coin, 
                    "warning_down" : warning_down, 
                    "att_date" : att_date, 
                    "att_count" : att_count, 
                    "first_ac" : first_ac, 
                    "chat_count" : chat_count
                };
            }

            console.log("load complete.");
        } 
        catch (error) {
            if (error.code === "ENOENT") {
                console.log("file not found");
                return -1
            }
        }

    }

    get_time = choice => {
        var today = new Date();   

        var year = today.getFullYear(); 
        var month = today.getMonth() + 1;  
        var date = today.getDate();  
        var day = today.getDay();  
        var hours = today.getHours(); 
        var minutes = today.getMinutes();  
        var seconds = today.getSeconds();  

        if (choice == "exact"){
            return `${year}-${month}-${date}-${day}-${hours}-${minutes}-${seconds}`;
        }
        
        else if (choice == "simple"){
            return `${year}-${month}-${date}-${day}`;
        }   
    }

    add_user = user => {
        if (user in this.User_Data) {
            console.log(`${user} is not new user.`);
            return -1
        }
        else {
            this.User_Data[user] = {
                "coin" : 0, 
                "warning_down" : 0, 
                "att_date" : 0, 
                "att_count" : 0, 
                "first_ac" : this.get_time("exact"), 
                "chat_count" : 0
            };
    
            console.log('new user.');
            return 0;
        }
    }

    manage = (user, coin) => {
        if (user in this.User_Data) {
            var judg = this.User_Data[user]["coin"] + coin
            if ( 0 > judg) {
                console.log(`not enough ${user}'coin.`);
                return -2;
            }
            this.User_Data[user]["coin"] += coin; 
            console.log(`${user}'s coins has been changed to ${coin}. remaining coins : ${this.User_Data[user]["coin"] - coin} -> ${this.User_Data[user]["coin"]}.`);
            return 0;
        }
        else {
            console.log(`${user} not found.`);
            return -1;
        }
    }

    manage_warning_down = (user, count) => {
        if (user in this.User_Data) {
            var judg = this.User_Data[user]["warning_down"] + count
            if ( 0 > judg) {
                console.log(`not enough ${user}'warning_down.`);
                return -2;
            }
            this.User_Data[user]["warning_down"] += count; 
            console.log(`${user}'s warning_down has been changed to ${count}. remaining warning_down : ${this.User_Data[user]["warning_down"] - count} -> ${this.User_Data[user]["warning_down"]}.`);
            return 0;
        }
        else {
            console.log(`${user} not found.`);
            return -1;
        }
    }

    clear = user => {
        if (user in this.User_Data) {
            delete this.User_Data[user];
            console.log(`${user}'s information has been initialized.`);
            return 0
        }
        else{
            console.log(`${user} not found.`);
            return -1
        }
    }

    add_goods = (goods, price) => {
        console.log(`The price of ${goods} is registered as ${price}.`);
        this.goods[goods] = price;
        console.log(this.goods);
    }

    del_goods = goods => {
        if (goods in this.goods) {
            console.log(`${goods} has been deleted.`);
            delete this.goods[goods];
            console.log(this.goods); 
            return 0;
        }
        else {
            console.log(`not found ${goods} in goods.`);
            return -1;
        }
    }

    buy = (user, goods) => {        
        if (user in this.User_Data){
            var coin = this.User_Data[user]["coin"];
            var price = this.goods[goods];

            if(coin >= this.goods[goods]) {
                this.manage(user, -1 * price);
                if(goods == "경고 차감권") this.manage_warning_down(user, 1);
            }
            
            else console.log("not enough coin.");
                return 0;    
        }

        else{
            console.log(`${user} not found.`);
            return -1;
        }
        
        
    }   

    cheack_coin = user => {
        if (user in this.User_Data){
            console.log("coin cheack.")
            return this.User_Data[user]["coin"];
        }

        else
        { 
            console.log(`${user} not found.`);
            return -1;
        }
    }

    attend = user => {
        if (user in this.User_Data){
            if(this.User_Data[user]["att_date"] != this.get_time("simple")){
                console.log("attend cheack.");
                this.manage(user, this.attend_coin);
                this.User_Data[user]["att_date"] = this.get_time("simple");
                this.User_Data[user]["att_count"] += 1;
                return 0;
            }
            else{
                console.log(`${user} have already attended.`);
                return -2;
            }
        }

        else
        {
            console.log(`${user} not found.`);
            return -1;
        }
    }

    add_chat_count = user => {
        this.User_Data[user]["chat_count"] += 1
    }

}

module.exports = Data_Control;

// const test = new Data_Control()

// test.add_goods("해으응", 100)
// test.del_goods("으응")
// test.attend('<@!612952077127385089>')
// test.manage("<@!612952077127385089>", -123)
// test.buy("<@!d>", "경고 차감권")
// test.add_user("1234")
// test.attend("1234")
// test.attend("1234")
// console.log(test.User_Data)
// test.save()

const xlsx = require( "xlsx" );

class Data_Control {

    constructor() {
        let User_Data = {}
        this.load()
    }

    load() {
        const excelFile = xlsx.readFile("data.xlsx");
        const sheetName = excelFile.SheetNames[0];       
        const firstSheet = excelFile.Sheets[sheetName]; 
        const Temp_Data = xlsx.utils.sheet_to_json( firstSheet, { defval : "" } );

        for( var num in Temp_Data ){
            var name = Temp_Data[num]["이름"]
            var coin = Temp_Data[num]["코인"]
            var warning_down = Temp_Data[num]["경고 1회 차감권"]
            var att_date  = Temp_Data[num]["출석날짜"]
            var att_count  = Temp_Data[num]["출첵"]
            var first_ac  = Temp_Data[num]["처음 출현 날짜"]
            var chat_count = Temp_Data[num]["대화수"]
            
            this.User_Data[name] = {
                "coin" : coin, 
                "warning_down" : warning_down, 
                "att_date" : att_date, 
                "att_count" : att_count, 
                "first_ac" : first_ac, 
                "chat_count" : chat_count
            }
        }
        
        
    }

    
     
}

const test = new Data_Control()

console.log(test.Temp_Data)

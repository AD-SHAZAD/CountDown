const START_ = 1717083934104 // variable storing page created time
const DOB_ =  1704067200000
var _c_time = START_
var _displayA = '30/6/2024'
Map = {
    getUnit : Change_Units,
    getWhole : Break
}

var _MODE_ = 'N'


function TimeSince( old_time ){ // Function to Get time Since the given date .
    return Change_Units( Date.now() - old_time );
}
function TimeUntill( coming_day ){          // function to get the time Until the given date . 
    return Change_Units(  coming_day - Date.now() )
}

function Change_Units( input ){ // Take milisecond ( unix time ) value and change them into standard m, h, s, d, y 

    let Seconds = Math.round( input     / 1000 );
    let Minutes = Math.floor( Seconds   /   60 );
    let Hours   = Math.floor( Minutes   /   60 );
    let Days    = Math.floor( Hours     /   24 );
    let Years   = Math.floor( Days      /  365 );

    return {
        YEARS:    Years,
        DAYS:     Days,
        HOURS:    Hours,
        MINIUTES: Minutes,
        SECONDS:  Seconds,
        Y:        Years,
        D:        Days,
        H:        Hours,
        M:        Minutes,
        S:        Seconds
    }

}

function Break( input ){

    let Days = Math.floor( input / 86400 )
    input %= 86400
    let Hours = Math.floor( input / 3600 )
    input %= 3600
    let miniutes = Math.floor( input / 60 )
    input %= 60

    return {
        D:     Days,
        H:     Hours,
        M:     miniutes,
        S:     input
    }
}

document.getElementById('Save_List').addEventListener('click', () => {
    console.log(' save button clicked')
    let Di = Check_( [ 1 , 31 ] , 'input_date')
    let Yi = Check_( [ 1970 , 2030 ] , 'input_year')
    let Mi = Check_( [ 1 , 12 ] , 'input_month')
    _displayA = `${Di}/${Mi}/${Yi}`
    _c_time = unix_converter( Di , Mi , Yi )


})

function Select_Mode( _mode ){
    _MODE_ = _mode;
    document.querySelectorAll('._modes').forEach( Element => {
        Element.style.color = 'white'
    })
    document.getElementById(`_mode${_mode}`).style.color = 'cyan'
}

document.getElementById('_modeN').addEventListener('click', () => {
    Select_Mode( 'N' )
})

document.getElementById('_modeS').addEventListener('click', () => {
    Select_Mode( 'S' )
})

document.getElementById('_modeM').addEventListener('click', () => {
    Select_Mode( 'M' )
})

document.getElementById('_modeH').addEventListener('click', () => {
    Select_Mode( 'H' )
})

document.getElementById('_modeD').addEventListener('click', () => {
    Select_Mode( 'D' )
})


function Check_( range_ , input_id ){
    let input_number = document.getElementById(input_id).value
    if ( input_number >= range_[0] && input_number <= range_[1]){
        document.getElementById(input_id).style.borderLeft = '2px solid cyan'
        return input_number
    } else {
        // document.getElementById(input_id).value = range_[0]
        document.getElementById(input_id).style.borderLeft = '2px solid red'
        return range_[0]
    }
}
function getPercentageOfYear() {
    const currentDate = new Date();
    const dayOfYear = Math.ceil((currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000);
    const percentageOfYear = (dayOfYear / 365) * 100;

    return percentageOfYear.toFixed(2) + "%";
}

//________________________________________________________________________________________

function unix_converter( D , M , Y ){
    let date = new Date(Y , M - 1 , D)
    output_ = date.getTime()
    return output_
}
// mainLoop Function ! to be called every 1000ms for time updation >->
function MainLoop() {
    
    var X

    if( _c_time > Date.now() ){

        X = Break( TimeUntill( _c_time ).SECONDS)

        if( _MODE_ == 'N' ){
            document.getElementById('display').innerHTML = `${X.D}:${X.H}:${X.M}:${X.S}`
        } else {
            document.getElementById('display').innerHTML = `${ TimeUntill( _c_time )[_MODE_]}`
        }

        // document.getElementById('display').innerHTML = `${X.D}:${X.H}:${X.M}:${X.S}`
        document.getElementById('display_a').innerHTML = `Till  ${_displayA}`
        document.getElementById('display_p').innerHTML = `${getPercentageOfYear()}   2024`
        // console.log('Untill')
        
    } else {

        X = Break( TimeSince( _c_time).SECONDS)

        // document.getElementById('display').innerHTML = `${X.D}:${X.H}:${X.M}:${X.S}`
        if( _MODE_ == 'N' ){
            document.getElementById('display').innerHTML = `${X.D}:${X.H}:${X.M}:${X.S}`
        } else {
            document.getElementById('display').innerHTML = `${ TimeSince( _c_time )[_MODE_]}${_MODE_.toLowerCase()}`
        }
        document.getElementById('display_a').innerHTML = `Since ${_displayA}`
        document.getElementById('display_p').innerHTML = `${getPercentageOfYear()}  /  2024`

    }
}
setInterval(MainLoop, 1000);  
  
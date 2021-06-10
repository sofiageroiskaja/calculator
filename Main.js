class CurriculumCalculator{
    constructor(language){
        this.currentSabbaticalLeave = 0;
        this.currentAbroadStudies = 0;
        this.curriculumChoice = $("#curriculum_dropdown :selected").text();
        this.bachelorsCurriculums = ["Informaatika", "Infoteadus", "Matemaatika, majandusmatemaatika ja andmeanalüüs"];
        this.mastersCurriculums = ["Haridustehnoloogia", "Infotehnoloogia juhtimine", "Infoteadus", "Informaatikaõpetaja", "Matemaatikaõpetaja", "Avatud ühiskonna tehnoloogiad", "Digitaalsed õpimängud", "Inimese ja arvuti interaktsioon", "Interaktsioonidisain"];
        this.fullStudyLoadLowerLimit = 0;
        this.payLoad = $('input[name="pay_load"]:checked').val();
        this.studyLowerLimit = 0;
        this.scenarioText = "";
        this.studyLoad = "";
        this.attendanceCount = $("#curriculum_attendance").val();
        this.sabbaticalCount = $("#sabbatical_leave").val();
        this.ectsCount = $("#ects_count").val();
        this.abroadSemesterCount = $("#abroad_semester_count").val();
        this.abroadEctsCount = $("#abroad_ects_count").val();
        this.degree = "none";
        this.universityAttendance = this.attendanceCount - this.sabbaticalCount;
        this.error = "";
        this.lang = language;
        this.init();
    }

    init(){
        //if(Validation.prototype.removeSpecialChars.call(this) == 1){
            if(Validation.prototype.inputValidation.call(this) == 1){
                $("#error").html("");
                $("#result_error").html("");
                $("#input_area_buttons").css("display", "none");
                $("#result_area_buttons").css("display", "block");
                $("#error").css("display", "none");
                $("#result_error").css("display", "block");
                Calculation.prototype.calcStudyLimits.call(this);
                Calculation.prototype.calcStudyLoad.call(this);
                Calculation.prototype.checkCurriculumDegree.call(this);
                this.drawResultBox();
                this.draw_graph();
            }
            $("#new_calculation_button").on("click", ()=>{this.pageReload();});
            $("#en").on("click", ()=>{this.lang = 1;});
            $("#en").on("click", ()=>{this.draw_graph();});
        //}
        
    }
    
    pageReload(){
        location.reload();
    }

    draw_graph(){
		Graphic.prototype.clear_canvas.call(this);
		Graphic.prototype.draw_base.call(this);
		if(this.payLoad == "free"){
			Graphic.prototype.draw_freeMargins.call(this);
		} 
		if(this.payLoad == "paid"){
			Graphic.prototype.draw_paidMargins.call(this);
		}
		Graphic.prototype.draw_data.call(this);
		Graphic.prototype.draw_student.call(this);
		
	}

    drawResultBox(){
        if($("#error").html("")){
            $("#curriculum_result").html("Sinu õppekava: " + this.curriculumChoice);
            $("#ects_result").html("Sinu ainepunktide arv: " + this.ectsCount + " EAP");
            $("#result_padding").css("display", "block");
            $("#results").css("display", "block");
            $("#footer").css("margin-top", "50px");
            Calculation.prototype.calcScenario.call(this);
        }
    }
}

let lang = 0;

$("#abroad_yes").on("click", function(){
    $("#abroad_input_area").css("display", "block");
    $("#footer").css("margin-top", "50px");
})

$("#abroad_no").on("click", function(){
    $("#abroad_input_area").css("display", "none");
})

$("#continue_button").on("click", function(){
    if($("#curriculum_dropdown :selected").text() == "Vali õppekava..."){
        $("#error").html("Vali õppekava!");
    } else {
        $("#error").html("");
        $("#curriculum_choice_area").css("display", "none");
        $("#curriculum_choice_area_buttons").css("display", "none");
        $("#input_area").css("display", "block");
        $("#input_area_buttons").css("display", "block");
    }
    
})

$("#en").on("click", function(){
    $("#en").css("color", "rgb(100, 146, 140)");
    $("#en").css("color", "rgb(100, 146, 140)");
})

$("#back_button").on("click", function(){
    $("#curriculum_choice_area").css("display", "block");
    $("#curriculum_choice_area_buttons").css("display", "block");
    $("#input_area").css("display", "none");
    $("#input_area_buttons").css("display", "none");
})

$("#pdf_save_button").on("click", function(){
    html2canvas($("#whole_page_area"), {
        onrendered: function(canvas) {         
            var imgData = canvas.toDataURL(
                "image/png");              
            var doc = new jsPDF("p", "mm");
            doc.addImage(imgData, "PNG", 10, 10);
            doc.save("TLU_calculation.pdf");
        }
    });
})

$(document).ready(function(){
    var $temp = $("<input>");
    var $url = $(location).attr('href');
    $('#clipboard_copy_button').click(function() {
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    if(lang == 1){
        //alert("Link copied!");
        swal({
            title: "Link copied!",
            icon: "success",
            button: "OK",
        });
    } else {
        //alert("Link kopeeritud!");
        swal({
            title: "Link kopeeritud!",
            icon: "success",
            button: "OK",
        });
    }
    });
})

$("#calculate_button").click(function(){
    let calculation = new CurriculumCalculator(lang);
    if(lang == 1){
        ResultToEng();
    }
})

$("#result_calculate_button").click(function(){
    let calculation = new CurriculumCalculator(lang);
    if(lang == 1){
        ResultToEng();
    }
})

function CalculatorToEng() {
    if(lang == 0){
        lang = 1;
    } else {
        lang = 0;
    }
    document.getElementById('heading').innerHTML = "Curriculum scenario calculator";
    document.getElementById('info_text').innerHTML = "Study data can be found in the study information system under study results (ÕIS)";
    document.getElementById('mainpage').innerHTML = "Back to mainpage";
    document.getElementById('mainpage').style.marginRight = "333px";
    document.getElementById('curriculum_dropdown_label').innerHTML = "Choose a curriculum";
    document.getElementById('select_curriculum').innerHTML = "Choose a curriculum...";
    document.getElementById('computer_science').innerHTML = "informatics";
    document.getElementById('info_science_bd').innerHTML = "Information science (BA)";
    document.getElementById('info_science_md').innerHTML = "Information science (MA)";
    document.getElementById('mathematics').innerHTML = "Mathematics, economic mathematics and data analysis";
    document.getElementById('education_technology').innerHTML = "Educational technology";
    document.getElementById('computer_science_business').innerHTML = "Information technology management";
    document.getElementById('computer_science_teacher').innerHTML = "Informatics teacher";
    document.getElementById('mathematics_teacher').innerHTML = "Math teacher";
    document.getElementById('open_society_technologies').innerHTML = "Open society technologies";
    document.getElementById('digital_study_games').innerHTML = "Digital learning games";
    document.getElementById('human_and_computer_interaction').innerHTML = "Human and computer interaction";
    document.getElementById('interaction_design').innerHTML = "Interaction design";
    document.getElementById('free_label').innerHTML = "Free";
    document.getElementById('paid_label').innerHTML = "Paid";
    document.getElementById('free_label').style.marginRight = "168px";
    document.getElementById('continue_button').innerHTML = "Next";
    document.getElementById('curriculum_attendance_label').innerHTML = "Number of semesters spent at TU";
    document.getElementById('sabbatical_leave_label').innerHTML = "Number of semesters on academic leave";
    document.getElementById('ects_count_label').innerHTML = "ECTS to be taken into account in the completion of the curriculum";
    document.getElementById('studied_abroad_label').innerHTML = "Have you been in foreign studies or foreign traineeships?";
    document.getElementById('currently_studying_abroad_label').innerHTML = "Are you currently in foreign studies or foreign internships?";
    document.getElementById('abroad_semester_count_label').innerHTML = "Number of semesters spent in foreign studies";
    document.getElementById('abroad_ects_count_label').innerHTML = "Number of ECTS completed in foreign studies";
    document.getElementById('studied_estonian_label').innerHTML = "Have you been assigned and completed the in-depth study of the national language?";
    document.getElementById('current_sabbatical_leave_label').innerHTML = "Are you currently on academic leave?";
    document.getElementById('back_button').innerHTML = "Back";
    document.getElementById('calculate_button').innerHTML = "Calculate";
    document.getElementById('first_help_txt').innerHTML = "Includes all semesters spent at Tallinn University (incl. academic leave, foreign studies, etc.)";
    document.getElementById('first_help_txt').style.width = "240px";
    document.getElementById('second_help_txt').style.width = "190px";
    document.getElementById('fourth_help_txt').style.top = "0.5px";
    document.getElementById('second_help_txt').innerHTML = 'Study information system (Õis) box "including academically"';
    document.getElementById('third_help_txt').innerHTML = 'Study information system (Õis) box "ECTS to be taken into account in the load calculation as of the end of the autumn semester and academic year""';
    document.getElementById('fourth_help_txt').innerHTML = "The completion of the in-depth study module is mandatory only for students of Estonian-language curricula whose Estonian language level does not meet the C1 requirement established by the university and who are assigned by the TU, on the basis of a placement test, to complete the in-depth study module.";
    document.getElementById('result_heading').innerHTML = "Result";
    document.getElementById('new_calculation_button').innerHTML = "New calculation";
    document.getElementById('result_calculate_button').innerHTML = "Calculate";
    document.getElementById('pdf_save_button').innerHTML = "Save as PDF";
    document.getElementById('infosystem').innerHTML = "Learning information system: ";
    
    var x = document.getElementsByClassName("yes_label");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].innerHTML = "Yes";
    }
    var y = document.getElementsByClassName("no_label");
    var j;
    for (j = 0; j < y.length; j++) {
        y[j].innerHTML = "No";
    }
    ErrorToEng();
    ResultToEng(); 
}


function ResultToEng(){
    $("#curriculum_result").html("Your curriculum: " + $("#curriculum_dropdown :selected").text());
    $("#ects_result").html("Your number of ECTS: " + $("#ects_count").val() + " ECTS");
    if($("#ects_count").val() < ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#study_load").html("Study load: Part time");
    } else {
        $("#study_load").html("Study load: Full time");
    }
    $("#study_lower_limit_result").html("The lower limit for continuing learning: " + ((($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 30) * 0.5) + " ECTS");
    $("#full_study_load_limit_result").html("Minimum required for full-time studies: " + (($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5) + " ECTS");
    
    if($("#ects_count").val() >= ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#scenario").html("You will continue to study full-time.");
    }
    if($("#ects_count").val() <= ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#scenario").html("You fall to part-time studies.");
    }
    if(($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) % 2 == 0 && $("#ects_count").val() < ((($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 30) * 0.5)){
        $("#scenario").html("<b>You are at risk of expulsion because the number of ECTS is lower than the minimum number of continuing studies</b>");
    }
}

function ErrorToEng(){
    var err1 = document.getElementById("error").innerHTML.replace("\nTLÜs viibitud semestrite arv ei tohi olla 0!\n", "\nThe number of semesters spent at TU must not be 0!\n");
    document.getElementById("error").innerHTML = err1;
    document.getElementById("result_error").innerHTML = err1;

    var err2 = document.getElementById("error").innerHTML.replace("\nAkadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!\n", "\nThe number of semesters spent on academic leave must not exceed the number of semesters spent at TU!\n");
    document.getElementById("error").innerHTML = err2;
    document.getElementById("result_error").innerHTML = err2;

    var err3 = document.getElementById("error").innerHTML.replace("\nÕppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!\n", "\nThe number of credits to be taken into account for the completion of the curriculum must not be 0!\n");
    document.getElementById("error").innerHTML = err3;
    document.getElementById("result_error").innerHTML = err3;

    var err4 = document.getElementById("error").innerHTML.replace("\nVälisõppes viibitud semestrite arv ei tohi olla 0!\n", "\nThe number of semesters spent studying abroad must not be 0!\n");
    document.getElementById("error").innerHTML = err4;
    document.getElementById("result_error").innerHTML = err4;

    var err5 = document.getElementById("error").innerHTML.replace("\nVälisõppes viibitud ainepunktide arv ei tohi olla 0!\n", "\nThe number of credits spent abroad must not be 0!\n");
    document.getElementById("error").innerHTML = err5;
    document.getElementById("result_error").innerHTML = err5;

    var err6 = document.getElementById("error").innerHTML.replace("\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!\n", "\nAcademic leave and study abroad cannot be taken at the same time!\n");
    document.getElementById("error").innerHTML = err6;
    document.getElementById("result_error").innerHTML = err6;
}

function CalculatorToEst() {
    if(lang == 1){
        lang = 0;
    } else {
        lang = 1;
    }
    document.getElementById('heading').innerHTML = "Õppekava täitmise kalkulaator";
    document.getElementById('info_text').innerHTML = "Õppeandmed leiab õppeinfosüsteemist õppetulemuste alt (ÕISist)";
    document.getElementById('mainpage').innerHTML = "Tagasi pealehele";
    document.getElementById('mainpage').style.marginRight = "340px";
    document.getElementById('curriculum_dropdown_label').innerHTML = "Vali õppekava: ";
    document.getElementById('select_curriculum').innerHTML = "Vali õppekava...";
    document.getElementById('computer_science').innerHTML = "Informaatika";
    document.getElementById('info_science_bd').innerHTML = "Infoteadus (BA)";
    document.getElementById('info_science_md').innerHTML = "Infoteadus (MA)";
    document.getElementById('mathematics').innerHTML = "Matemaatika, majandusmatemaatika ja andmeanalüüs";
    document.getElementById('education_technology').innerHTML = "Haridustehnoloogia";
    document.getElementById('computer_science_business').innerHTML = "Infotehnoloogia juhtimine";
    document.getElementById('computer_science_teacher').innerHTML = "Informaatikaõpetaja";
    document.getElementById('mathematics_teacher').innerHTML = "Matemaatikaõpetaja";
    document.getElementById('open_society_technologies').innerHTML = "Avatud ühiskonna tehnoloogiad";
    document.getElementById('digital_study_games').innerHTML = "Digitaalsed õpimängud";
    document.getElementById('human_and_computer_interaction').innerHTML = "Inimese ja arvuti interaktsioon";
    document.getElementById('interaction_design').innerHTML = "Interaktsioonidisain";
    document.getElementById('free_label').innerHTML = "Tasuta";
    document.getElementById('free_label').style.marginRight = "157px";
    document.getElementById('paid_label').innerHTML = "Tasuline";
    document.getElementById('continue_button').innerHTML = "Edasi";
    document.getElementById('curriculum_attendance_label').innerHTML = "TLÜs viibitud semestrite arv";
    document.getElementById('sabbatical_leave_label').innerHTML = "Akadeemilisel puhkusel viibitud semestrite arv";
    document.getElementById('ects_count_label').innerHTML = "Õppekava täitmisel arvesse minevad EAP-d";
    document.getElementById('studied_abroad_label').innerHTML = "Kas oled viibinud välisõppes või välispraktikal?";
    document.getElementById('currently_studying_abroad_label').innerHTML = "Kas sa viibid hetkel välisõppel või välispraktikal?";
    document.getElementById('abroad_semester_count_label').innerHTML = "Välisõppes viibitud semestrite arv";
    document.getElementById('abroad_ects_count_label').innerHTML = "Välisõppes sooritatud ainepunktide arv";
    document.getElementById('studied_estonian_label').innerHTML = "Kas sulle on määratud ja oled edukalt täitnud riigikeele süvaõppe kõrvaleriala?";
    document.getElementById('current_sabbatical_leave_label').innerHTML = "Kas viibid hetkel akadeemilisel puhkusel?";
    document.getElementById('back_button').innerHTML = "Tagasi";
    document.getElementById('calculate_button').innerHTML = "Kalkuleeri";
    document.getElementById('first_help_txt').innerHTML = "Sisaldab kõiki Tallinna Ülikoolis viibitud semestreid (k.a akadeemilisel puhkusel, välisõppes jne)";
    document.getElementById('first_help_txt').style.width = "240px";
    document.getElementById('second_help_txt').style.width = "190px";
    document.getElementById('fourth_help_txt').style.top = "0.5px";
    document.getElementById('second_help_txt').innerHTML = 'Õppeinfosüsteemi lahter "sh akadeemiliselt"';
    document.getElementById('third_help_txt').innerHTML = 'Õppeinfosüsteemi lahter "Koormusarvutusel arvesse minevad EAP-d sügissemestri ja õppeaasta lõpu seisuga"';
    document.getElementById('fourth_help_txt').innerHTML = "Süvaõppe mooduli täitmine on kohustuslik vaid eestikeelsete õppekavade üliõpilastele, kelle eesti keele tase ei vasta ülikoolis kehtestatud C1-nõudele ja kes on TLÜ poolt, paigutustesti alusel, määratud süvaõppe moodulit täitma.";
    document.getElementById('result_heading').innerHTML = "Tulemus";
    document.getElementById('new_calculation_button').innerHTML = "Alusta uuesti";
    document.getElementById('result_calculate_button').innerHTML = "Kalkuleeri";
    document.getElementById('pdf_save_button').innerHTML = "Salvesta PDFina";
    document.getElementById('infosystem').innerHTML = "Õppeinfosüsteem: ";
    
    var x = document.getElementsByClassName("yes_label");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].innerHTML = "Jah";
    }
    var y = document.getElementsByClassName("no_label");
    var j;
    for (j = 0; j < y.length; j++) {
        y[j].innerHTML = "Ei";
    }
    ErrorToEst();
    ResultToEst(); 
}

function ErrorToEst(){
    var err1 = document.getElementById("error").innerHTML.replace("\nThe number of semesters spent at TU must not be 0!\n", "\nTLÜs viibitud semestrite arv ei tohi olla 0!\n");
    document.getElementById("error").innerHTML = err1;
    document.getElementById("result_error").innerHTML = err1;

    var err2 = document.getElementById("error").innerHTML.replace("\nThe number of semesters spent on academic leave must not exceed the number of semesters spent at TU!\n", "\nAkadeemilisel puhkusel viibitud semestrite arv ei tohi olla üle TLÜs viibitud semestrite arvust!\n");
    document.getElementById("error").innerHTML = err2;
    document.getElementById("result_error").innerHTML = err2;

    var err3 = document.getElementById("error").innerHTML.replace("\nThe number of credits to be taken into account for the completion of the curriculum must not be 0!\n", "\nÕppekava täitmisel arvesse minevate EAP-de arv ei tohi olla 0!\n");
    document.getElementById("error").innerHTML = err3;
    document.getElementById("result_error").innerHTML = err3;

    var err4 = document.getElementById("error").innerHTML.replace("\nThe number of semesters spent studying abroad must not be 0!\n", "\nVälisõppes viibitud semestrite arv ei tohi olla 0!\n");
    document.getElementById("error").innerHTML = err4;
    document.getElementById("result_error").innerHTML = err4;

    var err5 = document.getElementById("error").innerHTML.replace("\nThe number of credits spent abroad must not be 0!\n", "\nVälisõppes viibitud ainepunktide arv ei tohi olla 0!\n");
    document.getElementById("error").innerHTML = err5;
    document.getElementById("result_error").innerHTML = err5;

    var err6 = document.getElementById("error").innerHTML.replace("\nAcademic leave and study abroad cannot be taken at the same time!\n", "\nAkadeemilisel puhkusel ning välisõppel ei saa korraga samal ajal viibida!\n");
    document.getElementById("error").innerHTML = err6;
    document.getElementById("result_error").innerHTML = err6;
}

function ResultToEst(){
    $("#curriculum_result").html("Sinu õppekava: " + $("#curriculum_dropdown :selected").text());
    $("#ects_result").html("Sinu ainepunktide arv: " + $("#ects_count").val() + " EAP");
    if($("#ects_count").val() < ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#study_load").html("Õppekoormus: Täiskoormus");
    } else {
        $("#study_load").html("Õppekoormus: Osakoormus");
    }
    $("#study_lower_limit_result").html("Õppes jätkamise alampiir: " + ((($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 30) * 0.5) + " ECTS");
    $("#full_study_load_limit_result").html("Alampiir õpingute jätkamiseks täiskoormuses: " + (($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5) + " ECTS");
    
    if($("#ects_count").val() >= ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#scenario").html("Jätkad täiskoormusel õppimist.");
    }
    if($("#ects_count").val() <= ($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 22.5){
        $("#scenario").html("Langed õpingutega osakoormusele.");
    }
    if(($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) % 2 == 0 && $("#ects_count").val() < ((($("#curriculum_attendance").val() - $("#sabbatical_leave").val()) * 30) * 0.5)){
        $("#scenario").html("<b>Oled eksmatrikuleerimisohus, kuna EAP-de arv on väiksem kui õppes jätkamise alampiir!</b>");
    }
}

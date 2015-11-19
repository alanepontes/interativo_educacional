var test1 = 0;
var distBox = 4, d2;
var text;
var i = 0;
var RP, QR, PQ;
var R, P, Q;
var area;
var xCoords;
var yCoords;
var A,B,C;
var AB, BC, CA;
var xTrans, yTrans
var Ah, Bh, Ch;
var newGame = false;
var showSolution = false;
var areaPQR, areaQAB, areaPQR, areaRCB;
var t1, t2, t3, t4;
var level = 0;
 
var n = 6; //number of unit triangles on Side.
var unitSide = Math.sqrt(4*Math.sqrt(3)/3); //side of a equilatere triangle of area 1.
var unitHeight = unitSide*Math.sqrt(3)/2;
var triangleSide = n*unitSide;
var triangleHeight = n*unitHeight;

var board = JXG.JSXGraph.initBoard('box', {boundingbox: [-distBox, triangleHeight+distBox, triangleSide+distBox, -3/2*distBox], axis:false, showcopyright: false, keepAspectRatio:true});  

function createBoundaryPoints() {
        A_ = [];    
    for(i=0; i < n+1; i++){
        A_.push(board.create('point', [i*unitSide/2, i*unitHeight], {visible:false}));
    }

    B_ = [];    
    for(i=0; i < n+1; i++){
        B_.push(board.create('point', [triangleSide - i*unitSide, 0], {visible:false}));
    }

    C_ = [];    
    for(i=0; i < n+1; i++){
        C_.push(board.create('point', [triangleSide/2+i*unitSide/2, triangleHeight-i*unitHeight], {visible:false}));
    }

}

function paintTriangleABC() { 

    // get random Indexes for array of lattice Points of each side 
    // last element of array was discarded (n=6) to not coincide with the ones of other side
    var randomIndexA = Math.floor(Math.random()*n); 
    var randomIndexB = Math.floor(Math.random()*n); 
    var randomIndexC = Math.floor(Math.random()*n); 


    // Creating points A, B, C.    
    A = board.create('point', [A_[randomIndexA].X(), A_[randomIndexA].Y()], {attractors: A_, attractorDistance:unitSide, snatchDistance:triangleSide, visible:true, name:'A',withLabel:true, color:'red', label:{offset:[-10, 10]}});         
    B = board.create('point', [B_[randomIndexB].X(), B_[randomIndexB].Y()], {attractors: B_, attractorDistance:unitSide, snatchDistance:triangleSide, visible:true, name:'B', withLabel:true, color:'red', label:{offset:[-10, -10]}});
    C = board.create('point', [C_[randomIndexC].X(), C_[randomIndexC].Y()], {attractors: C_, attractorDistance:unitSide, snatchDistance:triangleSide, visible:true, name:'C', withLabel:true, color: 'red'});

    // Creating point Ah, Ch1, Ch2 - height 
    Ch1 = board.create('perpendicularpoint', [C, PQ], {name:"`H_1`", withLabel:true, color:'blue', visible: false, label:{offset:[-25,10]}, dash:2, strokeWidth: 1});
    Ch2 = board.create('perpendicularpoint', [C, QR], {name:"`H_2`", withLabel:true, color:'blue', visible: false, label:{offset:[-10,-13]}, dash:2, strokeWidth: 1});
    Ah = board.create('perpendicularpoint', [A, QR], {name:"`H_3`", withLabel:true, color:'blue', visible: false, label:{offset:[-10,-13]}, dash:2, strokeWidth: 1});
    
    // Creating dashed lines for height
    hA_QR = board.create('line',[A, Ah], {straightFirst:false, straightLast:false, strokeWidth:1, dash:2, visible: false});
    hC_PQ = board.create('line',[C, Ch1], {straightFirst:false, straightLast:false, strokeWidth:1, dash:2, visible:false});
    hC_QR = board.create('line',[C, Ch2], {straightFirst:false, straightLast:false, strokeWidth:1, dash:2, visible:false});

    //A, B and C slide through PQ, QR and RP, respectively.  
    A.makeGlider(PQ);
    B.makeGlider(QR);
    C.makeGlider(RP);


    triangle = board.create('polygon', [A, B, C], {name: "",withLabel:true, strokeWidth: 1});

    area = calculateArea();
    text = board.create('text',[0, -1.5, "[ΔABC] = " + (area).toFixed(2)], {fixed:true});
    //t1 = board.create('text',[0, -1.5, " [ΔPQR] =" + (areaPQR).toFixed(2)], {fixed:true});
    //t2 = board.create('text',[3, -1.5, " [ΔQAB] = " + (areaQAB).toFixed(2)], {fixed:true});
    //t3 = board.create('text',[0, -2, " [ΔRBC] = " + (areaRCB).toFixed(2)], {fixed:true});
    //t4 = board.create('text',[3, -2, " [ΔPAC] = " + (areaPCA).toFixed(2)], {fixed:true});

    dragMove();
}

function dragMove() {

    A.on("drag", function() {
        generateText();
    });

    C.on("drag", function() {
        generateText();
    });

    B.on("drag", function() {
        generateText();
    });

}

function clearElements() {
    text.remove();
    
    if(newGame) {
        
        A.remove();
        B.remove();
        C.remove();
        triangle.remove();
        hC_QR.remove();
        hC_PQ.remove();
        hA_QR.remove();
        Ch1.remove();
        Ch2.remove();
        Ah.remove();

        P.setAttribute({
            withLabel:false
        });
        Q.setAttribute({
            withLabel:false
        });

        R.setAttribute({
            withLabel:false
        });
    }
    if(showSolution) {
        if(newGame) {
            tABQ.remove();
            tBCR.remove();
            tACP.remove();

            hC_QR.remove();
            hC_PQ.remove();
            hA_QR.remove();    
        }
        if(level!==0) {
            t1.remove();
            t2.remove();
            t3.remove();
            t4.remove();
        }
        //
        
    }
}

function generateText(area) { 
    if(showSolution) {
        area = calculateArea();
        clearElements();
        text = board.create('text',[0, -4   , " [ΔABC] = [ΔPQR] - ([ΔQAB]+[ΔRBC]+[ΔPAC]) = " + (area).toFixed(2)], {fixed:true});
        t1 = board.create('text',[0, -2, " [ΔPQR] = " + (areaPQR).toFixed(2)], {fixed:true});
        t2 = board. create('text',[5, -2, " [ΔQAB] = " + (areaQAB).toFixed(2)], {fixed:true});
        t3 = board.create('text',[0 , -3, " [ΔRBC] = " + (areaRCB).toFixed(2)], {fixed:true}); 
        t4 = board.create('text',[5, -3, " [ΔPAC] = " + (areaPCA).toFixed(2)], {fixed:true}); // 5 - 3
        level = 1;                                                 
    } else {
        area = calculateArea();                                             
        clearElements();
        text = board.create('text',[0, -1.5, " [ΔABC] = " + (area).toFixed(2)], {fixed:true});
    }
    //area = calculateArea();
    //clearElements();
    //text = board.create('text',[0, -1.1, " [ΔABC] = [ΔPQR] - ([ΔQAB]+[ΔRBC]+[ΔPAC]) = " + (area).toFixed(2)], {fixed:true});
    //t1 = board.create('text',[0, -1.5, " [ΔPQR] =" + (areaPQR).toFixed(2)], {fixed:true});
    //t2 = board.create('text',[3, -1.5, " [ΔQAB] = " + (areaQAB).toFixed(2)], {fixed:true});
    //t3 = board.create('text',[0, -2, " [ΔRBC] = " + (areaRCB).toFixed(2)], {fixed:true});
    //t4 = board.create('text',[3, -2, " [ΔPAC] = " + (areaPCA).toFixed(2)], {fixed:true});
}


function equals(a, b){
    return (a.X()==b.X()&&
            a.Y()==b.Y());
}

function calculateArea() {

    
    
    //degenerated cases (heights zero) are treated wrong by jsxgraph. 
    if(equals(A, Q)) areaQAB = 0;
    else areaQAB = Q.Dist(B)*A.Dist(Ah)/2;

    if(equals(C, R)) areaRCB = 0;
    else areaRCB = B.Dist(R)*C.Dist(Ch2)/2;

    if(equals(C, P)) areaPCA = 0;
    else areaPCA = P.Dist(A)*C.Dist(Ch1)/2;

    areaPQR = triangleSide*triangleHeight/2;

    return Math.round(areaPQR - (areaQAB + areaRCB +areaPCA));
}


function paintTriangularGridAndABC() {

    createBoundaryPoints();
   
    xCoords;
    yCoords;
    xTrans;
    yTrans;       


    Q = board.create('point', [A_[0].X(), A_[0].Y()], {fixed:true, visible:true,name:'Q',withLabel:false, color: 'blue', label:{offset:[-20,-10]}});
    R = board.create('point',[B_[0].X(), B_[0].Y()], {fixed:true,visible:true,name:'R',withLabel:false, color: 'blue', label:{offset:[15,-10]}});
    P = board.create('point', [C_[0].X(), C_[0].Y()], {fixed:true,visible:true,name:'P',withLabel:false, color:'blue', label:{offset:[0,15]}}); 

    QR= board.create('segment',[Q,R],{fixed:true,straightFirst:false,straightLast:false,strokeColor:'black',withLabel:false, strokeWidth: 1});
    RP = board.create('segment',[R,P],{fixed:true,straightFirst:false,straightLast:false,strokeColor:'black',withLabel:false, strokeWidth: 1});
    PQ = board.create('segment',[P,Q],{fixed:true,straightFirst:false,straightLast:false,strokeColor:'black',withLabel:false, strokeWidth: 1});
  

   for(i=0; i<n+1; i++) {  
          
       //fixed R and triangles with parallel side with PQ
           xCoords = [B_[0].X(), B_[n-i].X(), C_[i].X()];
           yCoords = [B_[0].Y(), B_[n-i].Y(), C_[i].Y()];
           
       //fixed Q and triangles with parallel side with PR
           xTrans = [A_[0].X(), A_[n-i].X(), B_[i].X()];
           yTrans = [A_[0].Y(), A_[n-i].Y(), B_[i].Y()];
           
       //fixed P and triangles with parallel side with QR
           z1 = [C_[0].X(), C_[n-i].X(), A_[i].X()];
           z2 = [C_[0].Y(), C_[n-i].Y(), A_[i].Y()];
       
          drawPolygon(xCoords, yCoords);
      drawPolygon(xTrans, yTrans);
          drawPolygon(z1, z2);
    }

    paintTriangleABC();
}

function ChangeInformation() {
    P.setAttribute({
        withLabel:true
    });
    Q.setAttribute({
        withLabel:true
    });

    R.setAttribute({
        withLabel:true
    });

    Ch1.setAttribute({
    visible:true
    });

    Ch2.setAttribute({
    visible:true
    });

    Ah.setAttribute({
    visible:true
    });

    
    hC_QR.setAttribute({
        visible:true
    });

    hC_PQ.setAttribute({
        visible:true
    });

    hA_QR.setAttribute({
        visible:true
    });

   
    tABQ = board.create('polygon', [Q, B, A], {color:"yellow"});
    tBCR = board.create('polygon', [B, R, C], {color:"pink"});
    tACP = board.create('polygon', [A, C, P], {color:"orange"});
    
}


function generateSolution() {
    showSolution = true;
    generateText();
    ChangeInformation();

}

function drawPolygon(xCoords, yCoords) {
    p1 = board.create('point', [xCoords[0], yCoords[0]], { fixed:true, visible:false,name:'A',withLabel:false, label:{offset:[-10,-10]}});
    p2 = board.create('point', [xCoords[1], yCoords[1]], {fixed:true, visible:false,name:'B',withLabel:false, label:{offset:[-10,-10]}});
    p3 = board.create('point', [xCoords[2], yCoords[2]], {fixed:true, visible:false,name:'C',withLabel:false, label:{offset:[-10,-10]}});         

    l1 = board.create('line',[p1,p2],{fixed:true,straightFirst:false,straightLast:false,strokeColor:'#000000',name:'',withLabel:false, strokeWidth: 1});
    l2 = board.create('line',[p2,p3],{fixed:true,straightFirst:false,straightLast:false, strokeColor:'#000000',name:'',withLabel:false, strokeWidth: 1});
    l3 = board.create('line',[p3,p1],{fixed:true,straightFirst:false,straightLast:false,strokeColor:'#000000',name:'',withLabel:false, strokeWidth: 1});


}

function showAnswer(){
    generateSolution(); 
    $("#showAnswer").attr("disabled",true);
    $("#answerExplanation").removeClass("hidden");
    $("#answerExplanation").html("<b>Solução:</b><br/>"+
    "<div class='justify'>Seja &Delta;PQR o triângulo equilátero que delimita toda a grade triangular, como mostrado na figura. Temos:</div>"+
    "<br/>"+
    "<div class='center'>(I) [&Delta;PQR] = [&Delta;ABC] + [&Delta;ABQ] + [&Delta;BCR] + [&Delta;ACP]</div>"+
    "<br/>"+
    "<div class='justify'>Sabemos que a área de um triângulo &Delta;XYZ é dada por:</div>"+
    "<br/>"+
    '<div class="center">`[&Delta;XYZ]=((base)*(al tura))/2`</div>'+
    "<br/>"+
    "<div class='justify'>Note que todos esses triângulos tem vértices situados na grade triangular. </div>"+
     "<div class='justify'>(II) Dado um triângulo 'unitário' da grade, que tem área 1, chamemos de `l` o tamanho do seu lado e `h` o valor de sua altura.</div>"+
"<br/>"+
    "<div class='justify'> Analisemos, por exemplo, o triângulo &Delta;CPA. Note que PA mede um múltiplo inteiro do lado `l` (II), pois possui seus vértices na grade triangular e é paralelo aos lado PQ do triângulo &Delta;PQR. Sua altura `CH_1` mede um múltiplo inteiro da altura `h` (II), pelo mesmo motivo. </div>"+
    "<br/>"+
    "<div class='justify'>Assim:</div>"+
    "<div class='center'>`PA=m_1*l`, para algum `m_1` inteiro.</div>"+ 
    "<div class='center'>`CH_1=n_1*h`, para algum `n_1` inteiro.</div>"+
    "<br/>"+
    "<div class='justify'>Logo:"+
    "<br/>"+
    "<div class='center'>`[&Delta;CPA] = (PA*CH_1)/2 = ((m_1*l)*(n_1*h))/2 = m_1*n_1*((l*h)/2) = m_1*n_1` </div>"+
    "<br/>"+
    "<div class='justify'>Seguindo raciocínio análogo para os triângulos &Delta;BCR e &Delta;ABQ e substituindo em (I):`</div>"+
    "<br/>"+
    "<div class='justify'>Podemos atribuir a soma acima o resumo: </div>"+
    "<br/>"+
    "<div class='center'>`[&Delta;ABC] = [&Delta;PQR] - (m_1*n_1+m_2*n_2+m_3*n_3)`</div>"+
    "<br/>"+
    "<div class='justify'>Na figura, podemos ver o resultado da conta numericamente. </div>"+
    "<br/>"
    );  
    compileMathJaxCode();
}

function compileMathJaxCode(){
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


function generateNewGame() {
    newGame = true; 
    clearElements();
    level = 0;
    resetAnswer();
    paintTriangleABC();
    newGame = false;
}

function resetAnswer(){
    showSolution = false;
    $("#showAnswer").attr("disabled",false);
    $("#answerExplanation").addClass("hidden");
}

function generateGame() {
    paintTriangularGridAndABC(); 
}

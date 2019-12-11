$(document).ready(function(){   

    $('#volcano-one').click(function(){
        $('#selected-card').attr('src',"image/volcanoone.jpg");
    })

    $('#volcano-two').click(function(){
        $('#selected-card').attr('src',"image/volcanotwo.jpg");
    })

    $('#steak-one').click(function(){
        $('#selected-card').attr('src',"image/volcanothree.jpg");
    })

    $('#five').click(function(){
        $('#amountdesc').html("<p>You will add $5 to this Gift Card</p>");
    })
    $('#ten').click(function(){
        $('#amountdesc').html("<p>You will add $10 to this Gift Card</p>");
    })
    $('#twenty').click(function(){
        $('#amountdesc').html("<p>You will add $20 to this Gift Card</p>");
    })
    $('#fifty').click(function(){
        $('#amountdesc').html("<p>You will add $50 to this Gift Card</p>");
    })
    $('#hundred').click(function(){
        $('#amountdesc').html("<p>You will add $100 to this Gift Card</p>");
    })

});

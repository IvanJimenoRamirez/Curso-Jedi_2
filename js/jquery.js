var act_id = 1;
var link = "https://curso-html-jedi.herokuapp.com/pokemons/1";

$(window).on("load", function(){
    refreshPokemon();
    $("#prev").on("click", Prev);
    $("#next").on("click", Next);
    $("#user_click").on("click", async function() {
        let valor = $("#user_input").val();
        let pokemon_db = await axios.get("https://curso-html-jedi.herokuapp.com/pokemons");
        let change = false;
        if (valor.trim() !== "") {
            if (isNaN(valor)) {
                //Text
                pokemon_db.data.forEach(element => {
                    if (element.name === valor) change = true;
                })
                if (change) {
                    $("#last_child").remove();
                    link = `https://curso-html-jedi.herokuapp.com/pokemons/?name=${valor}`;
                    refreshPokemon();
                }
                else {
                    let exist = document.getElementById("last_child");
                    if (exist === null) {
                        $("#error_div").append(`
                        <div id="last_child" class="alert alert-danger align_text_center" role="alert">
                            Incorrect name!
                        </div>
                        `)
                    }
                    else {
                        $("#last_child").remove();
                        $("#error_div").append(`
                        <div id="last_child" class="alert alert-danger align_text_center" role="alert">
                            Incorrect name!
                        </div>
                        `)
                    }
                }
            }
            else {
                console.log("Hola");
                //Num
                pokemon_db.data.forEach(element => {
                    if (`${element.num}` === `${valor}`) change = true;
                })
                if (change) {
                    $("#last_child").remove();
                    link = `https://curso-html-jedi.herokuapp.com/pokemons/?num=${valor}`;
                    refreshPokemon();
                }
                else {
                    let exist = document.getElementById("last_child");
                    if (exist === null) {
                        $("#error_div").append(`
                        <div id="last_child" class="alert alert-danger align_text_center" role="alert">
                            Incorrect pokedex number!
                        </div>
                    `)
                    }
                    else{
                        $("#last_child").remove();
                        $("#error_div").append(`
                        <div id="last_child" class="alert alert-danger align_text_center" role="alert">
                            Incorrect pokedex number!
                        </div>
                        `)
                    }
                }
            }
        }
    });
});
let refreshPokemon = async () => {
    $("#first_child").remove();
    await axios.get(link).then( pokemon => {
        let target_pokemon = pokemon.data;
        if (Array.isArray(target_pokemon)) target_pokemon = target_pokemon[0];
        act_id = target_pokemon.id;
        let hidden_move = "None";
        if (Array.isArray(target_pokemon.moves.HM)) {
            let aux = "";
            target_pokemon.moves.HM.forEach(element => {
                aux += element;
            });
            hidden_move = aux;
        }
        let types = "";
        let cont = 0;
        target_pokemon.types.forEach(type => {
            if (cont) types += " & ";
            types+=type.type.name;
            ++cont;
        })
        $("#pokemon_values").append(`
        <tr id="first_child">
            <th scope="row" class="align-middle">${target_pokemon.num}</th>
            <td class="align-middle"> <img src="${target_pokemon.images[0].front}"/></td>
            <td class="align-middle"> <img src="${target_pokemon.images[1].front_shiny}"/></td>
            <td class="align-middle">${target_pokemon.name}</td>
            <td class="align-middle">${types}</td>
            <td class="align-middle">${hidden_move}</td>
        </tr>
        `)
    }).catch( err => console.log(err));
}
let Prev = () => {
    if (act_id != 1) --act_id;
    else act_id = 6;
    link = `https://curso-html-jedi.herokuapp.com/pokemons/${act_id}`;
    refreshPokemon();
}
let Next = () => {
    if (act_id != 6) ++act_id;
    else act_id = 1;
    link = `https://curso-html-jedi.herokuapp.com/pokemons/${act_id}`;
    refreshPokemon();
}

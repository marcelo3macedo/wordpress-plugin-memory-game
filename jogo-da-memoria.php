<?php
/*
Plugin Name: Jogo da Memória Infantil
Description: Um jogo da memória divertido para crianças.
Version: 1.0
Author: Marcelo Macedo
*/

function jogo_memoria_enqueue_assets() {
    wp_enqueue_style('jogo-memoria-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('jogo-memoria-script', plugins_url('js/script.js', __FILE__), [], null, true);
}
add_action('wp_enqueue_scripts', 'jogo_memoria_enqueue_assets');

function jogo_memoria_shortcode() {
    ob_start();
    ?>
    <div id="memory-game">
        <div class="start-screen">
            <label for="player-name">Digite seu nome:</label>
            <input type="text" id="player-name" placeholder="Seu nome" />
            <button id="start-button">Iniciar Jogo</button>
        </div>

        <div class="game-screen hidden">
            <div class="info">
                <span id="player-display"></span>
                <span>⏱️ Tempo: <span id="timer">0s</span></span>
                <span>✅ Acertos: <span id="hits">0</span></span>
                <span>❌ Erros: <span id="mistakes">0</span></span>
            </div>
            <div class="grid" id="grid"></div>
        </div>

        <div class="result-screen hidden">
            <h2>Fim de Jogo!</h2>
            <p>✅ Acertos: <span id="final-hits"></span></p>
            <p>❌ Erros: <span id="final-mistakes"></span></p>
            <p>⏱️ Tempo: <span id="final-time"></span></p>
            <p>🏆 Pontuação: <span id="final-score"></span></p>
            <button onclick="window.location.reload()">Jogar Novamente</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('jogo-da-memoria', 'jogo_memoria_shortcode');

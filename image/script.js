// Tarification par option et niveau (1ère à 4ème)
const prices = {
    mat: 450,
    pri: 500,
    eb: 550,
    sci_1: 650,
    sci_2: 650,
    sci_3: 650,
    sci_4: 750, // +100$ pour finalistes
    tech_1: 700,
    tech_2: 700,
    tech_3: 700,
    tech_4: 800,
    com_1: 600,
    com_2: 600,
    com_3: 600,
    com_4: 650
};

const classSelect = document.getElementById('classSelector');
const periodSelect = document.getElementById('periodSelector');

function updatePaymentDetails() {
    const classKey = classSelect.value;
    const period = periodSelect.value;

    let base = prices[classKey];
    // Si paiement trimestriel, on divise le montant annuel par 3
    let currentAmount = (period === 'annuel') ? base : (base / 3);

    let discount = 0;
    if (period === 'annuel') {
        discount = currentAmount * 0.05; // 5% de remise
        document.getElementById('promoLine').style.display = 'flex';
        document.getElementById('promoVal').innerText = "- " + discount.toFixed(2) + " $";
    } else {
        document.getElementById('promoLine').style.display = 'none';
    }

    let tax = (currentAmount - discount) * 0.02; // 2% frais de service
    let total = (currentAmount - discount) + tax;

    // Mise à jour de l'affichage
    document.getElementById('baseVal').innerText = currentAmount.toFixed(2) + " $";
    document.getElementById('taxVal').innerText = tax.toFixed(2) + " $";
    document.getElementById('totalVal').innerText = total.toFixed(2) + " $";
    document.getElementById('btnAmount').innerText = total.toFixed(2);
}

// Écouter les changements sur les menus déroulants
classSelect.addEventListener('change', updatePaymentDetails);
periodSelect.addEventListener('change', updatePaymentDetails);

// Calcul initial au chargement
window.onload = updatePaymentDetails;
addOffscreenStyle();
patchSeatmap();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function patchSeatmap() {
    const rows = document.querySelectorAll('table[width] > tbody > tr');
    for (var i = 1; i < rows.length; i++) { // Skip the header
        Array.from(rows[i].children).forEach((column) => {
            Array.from(column.children).filter((span) => span.classList.contains('entityBucket') && Array.from(span.children).some(isSeatImage)
            ).forEach((seat) => {
                var seatType = '';
                if (seat.classList.contains('entityBucketOnWindow')) {
                    seatType = 'window seat, ';
                } else if (seat.classList.contains('entityBucketOnAisle')) {
                    seatType = 'aisle seat, ';
                }
                const seatImg = Array.from(seat.children).find(isSeatImage);
                const availability = seatImg.classList.contains('occupied') ? 'occupied' : 'available';
                const p = document.createElement("p");
                p.classList.add('ea11y_offscreen');
                p.innerHTML = `Seat ${seat.id}, ${seatType} ${availability}`;
                seat.appendChild(p);
            });
        });
    }
}

function addOffscreenStyle() {
    const head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.ea11y_offscreen { border: 0; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; }';
    head.appendChild(style);
}

function isSeatImage(element) {
    return element.classList.contains('seatImage');
}

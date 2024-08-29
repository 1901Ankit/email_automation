import { load } from 'cheerio';

export async function convertHtmlToJson(html) {
    const $ = load(html);

    const json = {
        counters: {
            u_row: 0,
            u_column: 0,
            u_content_menu: 0,
            u_content_text: 0,
            u_content_image: 0,
            u_content_button: 0,
            u_content_divider: 0,
            u_content_heading: 0
        },
        body: {
            id: "0QFAKPxyzM",
            rows: []
        }
    };

    $('body').children().each((i, elem) => {
        const rowId = `row${i + 1}`;

        json.counters.u_row += 1;

        const row = {
            id: rowId,
            cells: [1],
            columns: []
        };

        $(elem).children().each((j, childElem) => {
            const columnId = `col${i + 1}_${j + 1}`;
            const column = {
                id: columnId,
                contents: []
            };

            json.counters.u_column += 1;

            $(childElem).children().each((k, grandchildElem) => {
                let contentType = 'text';
                let contentValues = {
                    containerPadding: '0px',
                    anchor: '',
                    textAlign: 'left',
                    text: $(grandchildElem).text().trim(),
                    fontSize: '14px',
                    fontWeight: 'normal',
                    _meta: {
                        htmlID: `u_content_text_${json.counters.u_content_text + 1}`,
                        htmlClassNames: $(grandchildElem).attr('class') || 'u_content_text',
                        htmlStyle: $(grandchildElem).attr('style') || ''
                    }
                };

                if ($(grandchildElem).is('img')) {
                    console.log(`Processing image: ${$(grandchildElem).attr('src')}`);  // Debug log

                    contentType = 'image';
                    contentValues = {
                        ...contentValues,
                        src: {
                            url: $(grandchildElem).attr('src') || '',
                            width: $(grandchildElem).attr('width') || 'auto',
                            height: $(grandchildElem).attr('height') || 'auto',
                            maxWidth: '100%',
                            autoWidth: true
                        },
                        textAlign: 'center',
                        altText: $(grandchildElem).attr('alt') || '',
                        action: {
                            name: 'web',
                            values: {
                                href: $(grandchildElem).attr('href') || '',
                                target: '_blank'
                            }
                        },
                        _meta: {
                            htmlID: `u_content_image_${json.counters.u_content_image + 1}`,
                            htmlClassNames: $(grandchildElem).attr('class') || 'u_content_image',
                            htmlStyle: $(grandchildElem).attr('style') || ''
                        }
                    };

                    json.counters.u_content_image += 1;
                } else if ($(grandchildElem).is('a')) {
                    contentType = 'button';
                    contentValues = {
                        ...contentValues,
                        text: $(grandchildElem).text().trim(),
                        href: $(grandchildElem).attr('href') || '',
                        _meta: {
                            htmlID: `u_content_button_${json.counters.u_content_button + 1}`,
                            htmlClassNames: $(grandchildElem).attr('class') || 'u_content_button',
                            htmlStyle: $(grandchildElem).attr('style') || ''
                        }
                    };

                    json.counters.u_content_button += 1;
                }
                column.contents.push({
                    id: `content_${i}_${j}_${k}`,
                    type: contentType,
                    values: contentValues
                });
            });

            row.columns.push(column);
        });

        json.body.rows.push(row);
    });

    return json;
}
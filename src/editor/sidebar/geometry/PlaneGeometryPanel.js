﻿import SetGeometryCommand from '../../../command/SetGeometryCommand';
import UI from '../../../ui/UI';

/**
 * 平板几何体面板
 * @author mrdoob / http://mrdoob.com/
 */
function PlaneGeometryPanel(editor, object) {
    var container = new UI.Row();

    var geometry = object.geometry;
    var parameters = geometry.parameters;

    // width

    var widthRow = new UI.Row();

    var width = new UI.Number({
        value: parameters.width,
        onChange: update
    });

    widthRow.add(new UI.Label({
        text: '宽度'
    }));

    widthRow.add(width);

    container.add(widthRow);

    // height

    var heightRow = new UI.Row();

    var height = new UI.Number({
        value: parameters.height,
        onChange: update
    });

    heightRow.add(new UI.Label({
        text: '高度'
    }));

    heightRow.add(height);

    container.add(heightRow);

    // widthSegments

    var widthSegmentsRow = new UI.Row();
    var widthSegments = new UI.Integer({
        value: parameters.widthSegments,
        range: [1, Infinity],
        onChange: update
    });

    widthSegmentsRow.add(new UI.Label({
        text: '宽度段数'
    }));

    widthSegmentsRow.add(widthSegments);

    container.add(widthSegmentsRow);

    // heightSegments

    var heightSegmentsRow = new UI.Row();

    var heightSegments = new UI.Integer({
        value: parameters.heightSegments,
        range: [1, Infinity],
        onChange: update
    });

    heightSegmentsRow.add(new UI.Label({
        text: '高度段数'
    }));

    heightSegmentsRow.add(heightSegments);

    container.add(heightSegmentsRow);


    //

    function update() {

        editor.execute(new SetGeometryCommand(object, new THREE[geometry.type](
            width.getValue(),
            height.getValue(),
            widthSegments.getValue(),
            heightSegments.getValue()
        )));

    }

    container.render();

    return container;
};

export default PlaneGeometryPanel;

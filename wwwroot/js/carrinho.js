class Carrinho {
    clickIncremento(itemId, codigoProduto) {
        let quantidade = parseInt($('#p' + codigoProduto).val(), 10);
        quantidade++;

        if (quantidade > 1) {
            $('#b-minus-' + codigoProduto).removeAttr('disabled')
        }

        $('#p' + codigoProduto).val(quantidade);
        let data = this.getData(itemId, quantidade);

        console.log('clickIncremento', data);
        this.postQuantidade(data);
    }

    clickDecremento(itemId, codigoProduto) {
        let quantidade = parseInt($('#p' + codigoProduto).val(), 10);
        quantidade--;
        let data = this.getData(itemId, quantidade);
        
        if (quantidade <= 1) {
            $('#b-minus-' + codigoProduto).attr('disabled', 'disabled')
        }

        $('#p' + codigoProduto).val(quantidade);
        console.log('clickDecremento', data);
        //data.Quantidade--;
        this.postQuantidade(data);
    }

    updateQuantidade(itemId, quantidade) {
        let data = this.getData(itemId, quantidade);
        console.log('updateQuantidade', data);
        /*this.postQuantidade(data);*/
    }

    getData(itemId, novaQuantidade) {
        return {
            id: itemId,
            quantidade: novaQuantidade
        };
    }

    postQuantidade(pData) {

        let token = $('[name=__RequestVerificationToken]').val();

        let headers = {};
        headers['RequestVerificationToken'] = token;

        $.ajax({
            url: '/pedido/updatequantidade',
            type: 'POST',
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-1",
            dataType: 'json',
            async: true,
            data: pData,
            headers: headers
        }).done(function (response) {
            let itemPedido = response.itemPedido;
            let linhaDoItem = $('[item-id=' + itemPedido.id + ']')
            linhaDoItem.find('input').val(itemPedido.quantidade);
            linhaDoItem.find('[subtotal]').html((itemPedido.subtotal).duasCasas());
            let carrinhoViewModel = response.carrinhoViewModel;
            $('[numero-itens]').html('Total: ' + carrinhoViewModel.itens.length + ' itens');
            $('[total]').html((carrinhoViewModel.total).duasCasas());

            if (itemPedido.quantidade == 0) {
                linhaDoItem.remove();
            }
        });
    }

    adicionar(codigoProduto) {
        confirm('Deseja adicionar ao carrinho?', 'Clique em sim para adicionar o curso ao carrinho', { codigo: codigoProduto }, function (data) {
            Swal.showLoading(Swal.getConfirmButton())
            return SendPostAsync('/pedido/carrinho', data).then(dados => {
                console.log('Chamei', data, 'Retorno', dados)
                return dados;
            })
            
        }, function (retorno) {
            console.log('Retorno:', retorno);
            Swal.hideLoading(Swal.getConfirmButton())
            if (!retorno.value.isSucess) {
                errorMessage('Ocorreu um erro!', 'Erro ao adicionar ao carrinho: ' + retorno.value.message);
            } else {
                sucessMessage('Sucesso', 'Produto adicionado com sucesso');
            }
            
        })
    }


    remover(codigoProduto) {
        confirm('Deseja remover este item do carrinho?', 'Clique em sim para remover o produto', { codigo: codigoProduto }, function (data) {
            Swal.showLoading(Swal.getConfirmButton())
            return SendPostAsync('/pedido/RemoverItemCarrinho', data).then(dados => {
                console.log('Chamei', data, 'Retorno', dados)
                return dados;
            })

        }, function (retorno) {
            console.log('Retorno:', retorno);
            Swal.hideLoading(Swal.getConfirmButton())
            if (!retorno.value.isSucess) {
                errorMessage('Ocorreu um erro!', 'Erro ao adicionar ao carrinho: ' + retorno.value.message);
            } else {
                sucessMessage('Sucesso', 'Produto removido com sucesso');
            }

        })
    }

}

var carrinho = new Carrinho();

Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.', ',');
}




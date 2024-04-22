# frozen_string_literal: true

# spec/models/breadcrumb_spec.rb

require 'rails_helper'

RSpec.describe Breadcrumb do
  describe 'initialization' do
    let(:breadcrumb) { Breadcrumb.new('Home', '/home') }

    it 'assigns name and path from given arguments' do
      expect(breadcrumb.name).to eq('Home')
      expect(breadcrumb.path).to eq('/home')
    end
  end

  describe '#link?' do
    context 'when path is present' do
      let(:breadcrumb) { Breadcrumb.new('Home', '/home') }

      it 'indicates that the breadcrumb is navigable' do
        expect(breadcrumb.link?).to be true
      end
    end

    context 'when path is nil' do
      let(:breadcrumb) { Breadcrumb.new('Home', nil) }

      it 'indicates that the breadcrumb is not navigable' do
        expect(breadcrumb.link?).to be false
      end
    end

    context 'when path is empty' do
      let(:breadcrumb) { Breadcrumb.new('Home', '') }

      it 'indicates that the breadcrumb lacks a destination' do
        expect(breadcrumb.link?).to be false
      end
    end
  end
end

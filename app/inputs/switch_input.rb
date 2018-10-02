class SwitchInput < SimpleForm::Inputs::Base
  def input(wrapper_options = nil)
    merged_input_options = merge_wrapper_options(input_html_options, wrapper_options)

    input_tag = build_check_box(unchecked_value, merged_input_options)
    lever_tag = template.content_tag(:span, nil, class: 'lever')

    template.content_tag(:div, class: 'switch') do
      template.content_tag(:label) do
        "Off #{input_tag} #{lever_tag} On".html_safe
      end
    end
  end

  def build_check_box(unchecked_value, options)
    @builder.check_box(attribute_name, options, checked_value, unchecked_value)
  end

  def checked_value
    options.fetch(:checked_value, '1')
  end

  def unchecked_value
    options.fetch(:unchecked_value, '0')
  end
end

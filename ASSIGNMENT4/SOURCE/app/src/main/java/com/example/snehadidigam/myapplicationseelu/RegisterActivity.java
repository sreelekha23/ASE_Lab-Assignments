package com.example.snehadidigam.myapplicationseelu;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class RegisterActivity extends Activity {

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.content_register);
        TextView ls= (TextView) findViewById(R.id.link_to_login);

        ls.setOnClickListener(new View.OnClickListener(){
            public void onClick(View arg0){
                finish();
            }

        });


    }

}
